/* eslint-disable array-callback-return */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import StarRating from "~/layouts/components/StarRating";
import ChatPopup from "~/layouts/components/ChatPopup";

import banner from "~/assets/images/banner4.jpg";
import styles from "./Products.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);
const sortBarOptions = [
  {
    type: "normal",
    title: "Top Sales",
  },
  {
    type: "normal",
    title: "Ratings",
  },
  {
    type: "price",
    title: "Low to High",
  },
  {
    type: "price",
    title: "High to Low",
  },
];

const roundedFloat = (float) => {
  return Math.round((float + Number.EPSILON) * 100) / 100;
};

function Products() {
  const [commentPageBtns, setCommentPageBtns] = useState([]);
  const [products, setProducts] = useState([]);
  const [typeSort, setTypeSort] = useState("Top Sales");
  const [priceTitle, setPriceTitle] = useState("Price");
  const [cmtPage, setCmtPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.title = "All Products | Bird Trading Platform";
  }, []);

  useEffect(() => {
    const handleReload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("load", handleReload);
    return () => {
      window.removeEventListener("load", handleReload);
    };
  }, []);

  const handleNextCmtPage = (e) => {
    e.preventDefault();
    if (cmtPage < maxPage) {
      setCmtPage((c) => c + 1);
      return;
    }
    let max_length = commentPageBtns.length;
    if (max_length - cmtPage >= 3) {
      setMaxPage((m) => m + 3);
      setMinPage((m) => m + 3);
      setCmtPage((c) => c + 1);
    } else {
      let distance = max_length - cmtPage;
      setMaxPage((m) => m + distance);
      setMinPage((m) => m + distance);
      setCmtPage((c) => (distance > 0 ? c + 1 : c));
    }
  };

  const handlePrevCmtPage = (e) => {
    e.preventDefault();
    if (cmtPage > minPage) {
      setCmtPage((c) => c - 1);
      return;
    }
    let min = commentPageBtns[0];
    if (minPage - min >= 3) {
      setMaxPage((m) => m - 3);
      setMinPage((m) => m - 3);
      setCmtPage((c) => c - 1);
    } else {
      console.log(minPage);
      let distance = minPage - min;
      setMaxPage((m) => m - distance);
      setMinPage((m) => m - distance);
      setCmtPage((c) => (distance > 0 ? c - 1 : c));
    }
  };

  useEffect(() => {
    setProducts((prev) => []);
    axios
      .get(
        "/api/v1/publics/product/search?keyword=&filter=" +
          typeSort.toLowerCase()
      )
      .then((res) => {
        setCmtPage(1);
        window.scrollTo(0, 0);
        console.log(res.data);
        let cmtPage = [];
        for (let i = 1; i <= res.data.maxPage; i++) {
          cmtPage.push(i);
        }
        setCommentPageBtns(cmtPage);
        if (res.data.maxPage <= 5) setMaxPage(res.data.maxPage);
        setProducts(res.data.products);
      })
      .catch((e) => console.log(e));
  }, [typeSort]);

  useEffect(() => {
    setProducts((prev) => []);
    axios
      .get(
        "/api/v1/publics/product/search?keyword=&filter=" +
          typeSort.toLowerCase() +
          "&page=" +
          cmtPage
      )
      .then((res) => {
        window.scrollTo(0, 0);
        console.log(res.data);
        setProducts(res.data.products);
      })
      .catch((e) => console.log(e));
  }, [cmtPage]);

  return (
    <>
      <Header />
      <div className={cx("all_wrapper")}>
        <div className={cx("all_container")}>
          <ChatPopup />
          <div className={cx("all_banner")}>
            <img src={banner} alt="banner" className={cx("all-img")} />
            <div className={cx("all-header")}>
              <div className={cx("title")}>Bird Trading Platform</div>
              <div className={cx("sub-title")}>
                Connecting the community of bird lovers
              </div>
            </div>
          </div>
          <div className={cx("all_sort-bar")}>
            <span className={cx("sort-bar-label")}>Sort by</span>
            {/*Sort normal*/}
            <div className={cx("sort-by-options")}>
              {sortBarOptions.map((option, index) => {
                if (option.type === "normal") {
                  return (
                    <button
                      key={index}
                      className={
                        typeSort === option.title
                          ? cx("option-btn-active")
                          : cx("option-btn")
                      }
                      onClick={() => {
                        setTypeSort(option.title);
                        setPriceTitle("Price");
                      }}
                    >
                      {option.title}
                    </button>
                  );
                }
              })}
            </div>
            {/*Sort by price*/}
            <Tippy
              interactive
              delay={[0, 100]}
              placement="bottom-end"
              render={(attrs) => (
                <div
                  className={cx("price-sort-options")}
                  tabIndex="-1"
                  {...attrs}
                >
                  <PopperWrapper>
                    {sortBarOptions.map((option, index) => {
                      if (option.type === "price") {
                        return (
                          <div
                            className={cx("option")}
                            key={index}
                            onClick={() => {
                              setTypeSort(option.title);
                              setPriceTitle(option.title);
                            }}
                          >
                            {option.title}
                          </div>
                        );
                      }
                    })}
                  </PopperWrapper>
                </div>
              )}
            >
              <div className={cx("sort-by-price")}>
                <span
                  className={
                    priceTitle === "Price"
                      ? cx("price-text")
                      : cx("price-text-active")
                  }
                >
                  {priceTitle}
                </span>
                <i className={cx("fa-solid fa-chevron-right fa-rotate-90")}></i>
              </div>
            </Tippy>
          </div>
          <div className={cx("all_list-product")}>
            {products.map((ps, index) => (
              <Link
                to={"/product?productId=" + ps.product.id}
                className={cx("all_item-product")}
                key={index}
              >
                <img
                  src={ps.product.images[0].url}
                  alt="item-img"
                  className={cx("item-image")}
                />

                <div className={cx("item-content")}>
                  <div className={cx("item-name")}>{ps.product.name}</div>
                  {ps.salePercent ? (
                    <div className={cx("item-price")}>
                      <div className={cx("real-price")}>
                        {ps.product.price}$
                      </div>
                      <span className={cx("sale-price")}>
                        ${roundedFloat(ps.product.price * (1 - ps.salePercent / 100))}
                      </span>
                    </div>
                  ) : (
                    <div className={cx("item-price")}>
                      <span className={cx("sale-price")}>
                        {ps.product.price}$
                      </span>
                    </div>
                  )}
                  <div className={cx("rating_sold")}>
                    <div className={cx("product-rating")}>
                      <StarRating
                        rating={ps.product.rating}
                        font={1.2}
                        color={`gold`}
                      />
                    </div>
                    <div className={cx("sold")}>
                      {(() => {
                        let rs = "";
                        if (ps.product.sold >= 1000) {
                          const sold = ps.product.sold / 1000;
                          const rounded = Math.round(sold * 10) / 10;
                          return (rs += rounded + "k");
                        } else {
                          return (rs += ps.product.sold);
                        }
                      })()}{" "}
                      sold
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className={cx("all_more-products")}>
            <button
              className={cx("prev")}
              onClick={handlePrevCmtPage}
              disabled={cmtPage === 1}
            >
              <i className={cx("fa-solid fa-chevron-left", "prev-icon")}></i>
            </button>
            {commentPageBtns.map(
              (btn) =>
                btn <= maxPage &&
                btn >= minPage && (
                  <button
                    key={btn}
                    className={cmtPage === btn ? cx("page-active") : cx("page")}
                    onClick={() => setCmtPage(btn)}
                  >
                    {btn}
                  </button>
                )
            )}
            {maxPage !== commentPageBtns.length && (
              <button className={cx("page")} disabled>
                {"..."}
              </button>
            )}
            <button
              className={cx("next")}
              onClick={handleNextCmtPage}
              disabled={cmtPage == commentPageBtns.length}
            >
              <i
                className={cx(
                  "fa-solid fa-chevron-left fa-rotate-180",
                  "next-icon"
                )}
              ></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
