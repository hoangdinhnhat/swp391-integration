/* eslint-disable array-callback-return */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import axios from "axios";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import StarRating from "~/layouts/components/StarRating";
import ChatPupup from "~/layouts/components/ChatPopup";

import styles from "./ProductSearch.module.scss";

const cx = classNames.bind(styles);
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

function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentPageBtns, setCommentPageBtns] = useState([]);
  const [search, setSearch] = useState({
    shop: {
      id: 0,
      name: "",
      shopImage: "",
      rating: 5,
      followers: 0,
      products: 0,
    },
    products: [],
  });
  const [typeSort, setTypeSort] = useState("Relevance");
  const [priceTitle, setPriceTitle] = useState("Price");
  const [cmtPage, setCmtPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);
  const [locationFilter, setLocationFilter] = useState([]);
  const [searchP, setSearchP] = useState("");
  // const [searchFilter, setSearchFilter] = useState();
  const location = useLocation();

  useEffect(() => {
    let search = searchParams.get("search");
    setSearch((prev) => ({ ...prev, products: [] }));
    axios
      .get(
        "/api/v1/publics/product/search?keyword=" +
          search +
          "&filter=" +
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
        setSearch(res.data);
      })
      .catch((e) => console.log(e));
  }, [typeSort, searchParams.get("search")]);

  useEffect(() => {
    let search = searchParams.get("search");
    setSearch((prev) => ({ ...prev, products: [] }));
    axios
      .get(
        "/api/v1/publics/product/search?keyword=" +
          search +
          "&filter=" +
          typeSort.toLowerCase() +
          "&page=" +
          cmtPage
      )
      .then((res) => {
        window.scrollTo(0, 0);
        console.log(res.data);
        setSearch(res.data);
      })
      .catch((e) => console.log(e));
  }, [cmtPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.title = `${searchParams.get(
      "search"
    )} - Prices and Deals | Bird Trading Platform`;
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

  useEffect(() => {
    axios
      .get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            "Content-Type": "application/json",
            Token: "fc0ea700-c65d-11ed-ab31-3eeb4194879e",
          },
        }
      )
      .then((res) => {
        let newArr = res.data.data
          .map((p) => ({
            name: p.NameExtension[0],
          }))
          .filter(
            (p) => p.name.toLowerCase().indexOf(searchP.toLowerCase()) !== -1
          );
        setLocationFilter(Array.from(newArr));
      });
  }, [searchP]);

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
    return product.salePercent && product.saleQuantity > product.sold;
  };

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <>
      <Header />
      <div className={cx("product-search_wrapper")}>
        {search.products.length > 0 || search.shop ? (
          <div className={cx("product-search_container")}>
            <ChatPupup />
            <div className={cx("product-search_filter-panel")}>
              <div className={cx("product-search_filter-status")}>
                <i
                  className={cx("fa-sharp fa-light fa-filter", "icon-filter")}
                ></i>
                <span className={cx("filter-text")}>SEARCH FILTER</span>
              </div>
              <div className={cx("product-search_category-filter")}>
                <div className={cx("category-header")}>By category</div>
                <div className={cx("category-body")}>
                  <div className={cx("checkbox-filter")}>
                    <input type="checkbox" className={cx("checkbox-check")} />
                    <span className={cx("checkbox-text")}>Bird</span>
                  </div>
                  <div className={cx("checkbox-filter")}>
                    <input type="checkbox" className={cx("checkbox-check")} />
                    <span className={cx("checkbox-text")}>Bird Foods</span>
                  </div>
                  <div className={cx("checkbox-filter")}>
                    <input type="checkbox" className={cx("checkbox-check")} />
                    <span className={cx("checkbox-text")}>Bird Medicines</span>
                  </div>
                  <div className={cx("checkbox-filter")}>
                    <input type="checkbox" className={cx("checkbox-check")} />
                    <span className={cx("checkbox-text")}>Bird Cages</span>
                  </div>
                  <div className={cx("checkbox-filter")}>
                    <input type="checkbox" className={cx("checkbox-check")} />
                    <span className={cx("checkbox-text")}>
                      Bird Accessories
                    </span>
                  </div>
                </div>
              </div>
              <div className={cx("product-search_price-range-filter")}>
                <div className={cx("price-header")}>Price Range</div>
                <div className={cx("price-edit")}>
                  <input
                    type="number"
                    className={cx("edit-min")}
                    maxLength="13"
                    placeholder="MIN"
                  />
                  <input
                    type="number"
                    className={cx("edit-max")}
                    maxLength="13"
                    placeholder="MAX"
                  />
                </div>
                <button className={cx("price-apply")}>APPLY</button>
              </div>
              <div className={cx("product-search_location-filter")}>
                <div className={cx("location-header")}>Shipped from</div>
                <div className={cx("location-body")}>
                  <div className={cx("search_location")}>
                    <input
                      type="text"
                      className={cx("form-input")}
                      value={searchP}
                      placeholder="Your address"
                      onChange={(e) => setSearchP(e.target.value)}
                      required
                    />
                    <button className={cx("search")} type="submit">
                      <i className={cx("fa-regular fa-magnifying-glass")}></i>
                    </button>
                  </div>
                  {locationFilter.map((location, index) => (
                    <div className={cx("checkbox-filter")} key={index}>
                      <input type="checkbox" className={cx("checkbox-check")} />
                      <span className={cx("checkbox-text")}>
                        {location.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={cx("product-search_content")}>
              <div className={cx("product-search_shop-related")}>
                {search.shop && search.shop.name && (
                  <>
                    <div className={cx("shop-related_header")}>
                      <span className={cx("shop-related_title")}>
                        Shop related to{" "}
                      </span>
                      <span className={cx("shop-related_result")}>
                        "{searchParams.get("search")}"
                      </span>
                    </div>
                    <div className={cx("shop-related_shop")}>
                      <Link
                        to={"/shop?shopId=" + search.shop.id}
                        className={cx("shop-related_shop-item")}
                      >
                        <img
                          src={search.shop.shopImage}
                          alt="shop-avatar"
                          className={cx("avatar-shop")}
                        />

                        <div className={cx("shop-item_info")}>
                          <div className={cx("shop-item_nick-name")}>
                            {search.shop.name}
                          </div>
                          <div className={cx("shop-item_user-name")}>
                            {search.shop.name}
                          </div>
                          <div className={cx("shop-item_follow-count")}>
                            <span className={cx("count-number")}>
                              {(() => {
                                let rs = "";
                                if (search.shop.followers >= 1000) {
                                  const follower = search.shop.followers / 1000;
                                  const rounded = Math.round(
                                    (follower * 10) / 10
                                  );
                                  return (rs += rounded + "k");
                                } else {
                                  return (rs += search.shop.followers);
                                }
                              })()}
                            </span>{" "}
                            <span className={cx("count-text")}>Followers</span>
                          </div>
                        </div>
                        <div className={cx("shop-related_shop-statistic")}>
                          <div className={cx("seller-info-item")}>
                            <div className={cx("header")}>
                              <i className={cx("fa-light fa-box", "icon")}></i>
                              <span>{search.shop.products}</span>
                            </div>
                            <div className={cx("text")}>Products</div>
                          </div>
                          <div className={cx("seller-info-item")}>
                            <div className={cx("header")}>
                              <i className={cx("fa-light fa-star", "icon")}></i>
                              <span>{search.shop.rating}</span>
                            </div>
                            <div className={cx("text")}>Ratings</div>
                          </div>
                          <div className={cx("seller-info-item")}>
                            <div className={cx("header")}>
                              <i
                                className={cx(
                                  "fa-light fa-message-dots",
                                  "icon"
                                )}
                              ></i>
                              <span>100%</span>
                            </div>
                            <div className={cx("text")}>Response Rate</div>
                          </div>
                          <div className={cx("seller-info-item")}>
                            <div className={cx("header")}>
                              <i
                                className={cx(
                                  "fa-sharp fa-light fa-clock",
                                  "icon"
                                )}
                              ></i>
                              <span>{"within hours"}</span>
                            </div>
                            <div className={cx("text")}>Response Time</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={cx("product-search_result")}>
                <div className={cx("result_header")}>
                  <i className={cx("fa-light fa-lightbulb-exclamation")}></i>
                  <span className={cx("main-result")}>Search result for </span>
                  <span className={cx("result")}>
                    "{searchParams.get("search")}"
                  </span>
                </div>
                <div className={cx("result_sort-bar")}>
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
                      <i
                        className={cx("fa-solid fa-chevron-right fa-rotate-90")}
                      ></i>
                    </div>
                  </Tippy>
                </div>
                <div className={cx("product-result_list")}>
                  {search.products.map((product, index) => (
                    <Link
                      to={"/product?productId=" + product.product.id}
                      className={cx("result_item")}
                      key={index}
                    >
                      <img
                        src={product.product.images[0].url}
                        alt="item-img"
                        className={cx("item-image")}
                      />
                      <div className={cx("item-content")}>
                        <div className={cx("item-name")}>
                          {product.product.name}
                        </div>
                        {saleCondition(product) ? (
                          <div className={cx("item-price")}>
                            <div className={cx("real-price")}>
                              {product.product.price}$
                            </div>
                            <span className={cx("sale-price")}>
                              $
                              {roundedFloat(
                                product.product.price *
                                  (1 - product.salePercent / 100)
                              )}
                            </span>
                          </div>
                        ) : (
                          <div className={cx("item-price")}>
                            <span className={cx("sale-price")}>
                              {product.product.price}$
                            </span>
                          </div>
                        )}
                        <div className={cx("rating_sold")}>
                          <StarRating
                            rating={product.product.rating}
                            font={1.4}
                            color={`gold`}
                          />
                          <div className={cx("sold")}>
                            {(() => {
                              let rs = "";
                              if (product.product.sold >= 1000) {
                                const sold = product.product.sold / 1000;
                                const rounded = Math.round(sold * 10) / 10;
                                return (rs += rounded + "k");
                              } else {
                                return (rs += product.product.sold);
                              }
                            })()}{" "}
                            sold
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className={cx("more-products")}>
                <button
                  className={cx("prev")}
                  onClick={handlePrevCmtPage}
                  disabled={cmtPage == 1}
                >
                  <i
                    className={cx("fa-solid fa-chevron-left", "prev-icon")}
                  ></i>
                </button>
                {commentPageBtns.map(
                  (btn) =>
                    btn <= maxPage &&
                    btn >= minPage && (
                      <button
                        key={btn}
                        className={
                          cmtPage === btn ? cx("page-active") : cx("page")
                        }
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
                  disabled={cmtPage == search.maxPage}
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
        ) : (
          <div className={cx("product-search_no-product-found")}>
            <div className={cx("search-empty-result")}>
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png"
                alt="empty"
                className={cx("search-empty-result_img")}
              />
              <div className={cx("search-empty-result_title")}>
                No results found
              </div>
              <div className={cx("search-empty-result_hint")}>
                Try different or more general keywords
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductSearch;
