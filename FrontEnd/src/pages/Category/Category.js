/* eslint-disable array-callback-return */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import StarRating from "~/layouts/components/StarRating";
import ChatPupup from "~/layouts/components/ChatPopup";
import banner from "~/assets/images/banner4.jpg";
import styles from "./Category.module.scss";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const cx = classNames.bind(styles);
const categoryTitle = {
  bird: {
    title: "Birds of Wonder",
    subTitle: "Explore the kingdom of birds",
  },
  "bird food": {
    title: "Bird's Food",
    subTitle: "Essential Nutrition for Birds",
  },
  "bird medicine": {
    title: "Bird's Medicine",
    subTitle: "Best health for birds",
  },
  "bird cage": {
    title: "Bird's Cage",
    subTitle: "Comfortable accommodation for birds",
  },
  "bird accessory": {
    title: "Bird's Accessory",
    subTitle: "Essential Accessories for Stylish Birds",
  },
  default: {
    title: "Birds of Wonder",
    subTitle: "Explore the kingdom of birds",
  },
};

const sortBarOptions = [
  {
    type: "normal",
    title: "Relevance",
  },
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

var stompClient = null;

function Category() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentPageBtns, setCommentPageBtns] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({
    shops: [],
    ps: [],
    categoryName: "default",
  });
  const [typeSort, setTypeSort] = useState("Relevance");
  const [priceTitle, setPriceTitle] = useState("Price");
  const [cmtPage, setCmtPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);
  const [openChat, setOpenChat] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    let categoryId = searchParams.get("categoryId");
    let categoryGroupId = searchParams.get("categoryGroupId");
    if (!categoryId) {
      axios
        .get("/api/v1/publics/category/category-group/" + categoryGroupId)
        .then((res) => {
          console.log(res.data);
          setCategoryDetails(res.data);
          document.title = `${res.data[0].categoryGroup.name} | Bird Trading Platform`;
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get("/api/v1/publics/category/" + categoryId)
        .then((res) => {
          console.log(res.data);
          setCategoryDetails(res.data);
          document.title = `${res.data[0].category.name} | Bird Trading Platform`;
        })
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    let categoryId = searchParams.get("categoryId");
    setCategoryDetails((prev) => ({ ...prev, ps: [] }));
    axios
      .get(
        "/api/v1/publics/category/" +
          categoryId +
          "?filter=" +
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
        setCategoryDetails(res.data);
        document.title = `${res.data.categoryName} | Bird Trading Platform`;
      })
      .catch((e) => console.log(e));
  }, [typeSort]);

  useEffect(() => {
    let categoryId = searchParams.get("categoryId");
    setCategoryDetails((prev) => ({ ...prev, ps: [] }));
    axios
      .get(
        "/api/v1/publics/category/" +
          categoryId +
          "?filter=" +
          typeSort.toLowerCase() +
          "&page=" +
          cmtPage
      )
      .then((res) => {
        window.scrollTo(0, 0);
        console.log(res.data);
        setCategoryDetails(res.data);
      })
      .catch((e) => console.log(e));
  }, [cmtPage]);

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

  const saleCondition = (product) => {
    return product.saleQuantity > product.sold;
  };

  const handleNewConversation = (event, shopId) => {
    event.preventDefault();
    axios
      .get("/api/v1/users/info")
      .then((res) => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect(
          {},
          () => onConnected(shopId, res.data.id),
          (e) => console.log(e)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onConnected = (shopId, userId) => {
    const request = {
      fromId: userId,
      toId: shopId,
      content: "Let's Start",
      sendTime: new Date(),
      chatterType: "USER",
    };
    stompClient.send("/app/conversation-request", {}, JSON.stringify(request));
    setOpenChat(true);
  };

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <>
      <Header />
      <div className={cx("category_wrapper")}>
        <div className={cx("category_container")}>
          <ChatPupup openChat={openChat} setOpenChat={setOpenChat}/>
          <div className={cx("category_banner")}>
            <img src={banner} alt="banner" className={cx("category-img")} />
            <div className={cx("category-header")}>
              <div className={cx("title")}>
                {
                  categoryTitle[categoryDetails.categoryName.toLowerCase()]
                    .title
                }
              </div>
              <div className={cx("sub-title")}>
                {
                  categoryTitle[categoryDetails.categoryName.toLowerCase()]
                    .subTitle
                }
              </div>
            </div>
          </div>
          <div className={cx("category_top-shop")}>
            {categoryDetails.shops.map((shop, index) => (
              <a
                href="#"
                className={cx("shop_item")}
                key={index}
              >
                <img
                  src={shop.shopImage}
                  alt="avatar-shop"
                  className={cx("shop-avatar")}
                />
                <div className={cx("shop-info")}>
                  <div className={cx("shop-name")}>{shop.name}</div>
                  <div className={cx("shop-rating")}>
                    <span className={cx("rating-total")}>
                      <span className={cx("rating-real")}>{shop.rating}</span>
                      /5
                    </span>
                    <div className={cx("rating-icon")}>
                      <StarRating
                        rating={shop.rating}
                        font={1.2}
                        color={`gold`}
                      />
                    </div>
                  </div>
                  <div className={cx("shop-contact")}>
                    <button className={cx("chat")} onClick={(e) => handleNewConversation(e, shop.id)}>
                      <i
                        className={cx("fa-solid fa-messages", "icon-chat")}
                      ></i>
                      <span>Chat</span>
                    </button>
                    <Link to={"/shop?shopId=" + shop.id} className={cx("view")}>
                      <i
                        className={cx(
                          "fa-sharp fa-solid fa-bag-shopping",
                          "icon-view"
                        )}
                      ></i>
                      <span>View Shop</span>
                    </Link>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className={cx("category_sort-bar")}>
            <span className={cx("sort-bar-label")}>Sort by</span>
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
          <div className={cx("category_list-product")}>
            {categoryDetails.ps.map((ps, index) => (
              <Link
                to={"/product?productId=" + ps.product.id}
                className={cx("category_item")}
                key={index}
              >
                <img
                  src={ps.product.images[0].url}
                  alt="item-img"
                  className={cx("item-image")}
                />

                <div className={cx("item-content")}>
                  <div className={cx("item-name")}>{ps.product.name}</div>
                  {saleCondition(ps) ? (
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
          <div className={cx("category_more-products")}>
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

export default Category;
