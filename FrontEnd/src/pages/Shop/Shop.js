/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer/Footer";
import StarRating from "~/layouts/components/StarRating";
import ChatPupup from "~/layouts/components/ChatPopup";
import { UserContext } from "~/userContext/Context";
import styles from "./Shop.module.scss";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const cx = classNames.bind(styles);

const sortBarOptions = [
  {
    type: "normal",
    title: "Popular",
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

function Shop() {
  const context = useContext(UserContext);
  const user = context.state;
  const [commentPageBtns, setCommentPageBtns] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [shop, setShop] = useState({
    shopDetails: {
      id: -1,
      shopImage: "",
      name: "",
      active: "Active 11 minutes ago",
      products: 0,
      rating: 5,
      followers: 0,
      responseRate: 100,
    },
    products: [],
    maxPage: 0,
  });
  const [typeSort, setTypeSort] = useState("Popular");
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
    let shopId = searchParams.get("shopId");
    setShop((prev) => ({ ...prev, products: [] }));
    axios
      .get(
        "/api/v1/publics/shop/" +
          shopId +
          "?page=" +
          cmtPage +
          "&filter=" +
          typeSort.toLowerCase()
      )
      .then((res) => {
        console.log(res.data);
        setShop(res.data);
        let cmtPage = [];
        for (let i = 1; i <= res.data.maxPage; i++) {
          cmtPage.push(i);
        }
        setCommentPageBtns(cmtPage);
        if (res.data.maxPage <= 5) setMaxPage(res.data.maxPage);
        document.title = `${res.data.name} | Bird Trading Platform`;
      })
      .catch((e) => console.log(e));
  }, [typeSort, cmtPage]);

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

  const handleFollowShop = (e) => {
    e.preventDefault();
    if (!checkOwner()) {
      axios
        .post("/api/v1/users/subscription/" + shop.shopDetails.id)
        .then((res) => window.location.reload())
        .catch((e) => console.log(e));
    }
  };

  const checkFollow = () => {
    if (user) {
      return user.shopSubscription.indexOf(shop.shopDetails.id) !== -1;
    }
    return false;
  };

  const checkOwner = () => {
    if (user && shop.shopDetails.userId) {
      return shop.shopDetails.userId === user.id;
    }
    return false;
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
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <ChatPupup openChat={openChat} setOpenChat={setOpenChat} />
          <div className={cx("shop_container")}>
            <div className={cx("shop-left_content")}>
              <img
                src={shop.shopDetails.shopImage}
                alt="avatar"
                className={cx("shop_avatar")}
              />
              <div className={cx("shop-info")}>
                <div className={cx("shop-name")}>{shop.shopDetails.name}</div>
                <div className={cx("shop-active")}>
                  <span>{shop.active}</span>
                </div>
                <div className={cx("shop-interact")}>
                  <button
                    className={cx("shop-chat")}
                    onClick={(e) => {
                      handleNewConversation(e, shop.shopDetails.id)
                    }}
                  >
                    <i className={cx("fa-solid fa-messages", "icon-chat")}></i>
                    <span>Chat</span>
                  </button>
                  {checkFollow() ? (
                    <button
                      className={cx("shop-follow")}
                      onClick={handleFollowShop}
                      disabled={checkOwner()}
                    >
                      <i
                        className={cx("fa-regular fa-check", "icon-follow")}
                      ></i>
                      <span>Following</span>
                    </button>
                  ) : (
                    <button
                      className={cx("shop-follow")}
                      onClick={handleFollowShop}
                      disabled={checkOwner()}
                    >
                      <i
                        className={cx("fa-regular fa-plus", "icon-follow")}
                      ></i>
                      <span>Follow</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("right-content")}>
              <a href="#product_list" className={cx("shop-totalProducts")}>
                <i className={cx("fa-light fa-box", "icon")}></i>
                <span className={cx("name")}>Products: </span>
                <span className={cx("number")}>
                  {" "}
                  {shop.shopDetails.products}
                </span>
              </a>
              <div className={cx("shop-totalFollowers")}>
                <i className={cx("fa-light fa-user", "icon")}></i>
                <span className={cx("name")}>Followers: </span>
                <span className={cx("number")}>
                  {" "}
                  {shop.shopDetails.followers}
                </span>
              </div>
              <div className={cx("shop-totalRating")}>
                <i className={cx("fa-light fa-star", "icon")}></i>
                <span className={cx("name")}>Ratings: </span>
                <span className={cx("number")}> {shop.shopDetails.rating}</span>
              </div>
              <div className={cx("shop-totalResponseRate")}>
                <i className={cx("fa-light fa-message-dots", "icon")}></i>
                <span className={cx("name")}>Response rate: </span>
                <span className={cx("number")}> 100%</span>
              </div>
            </div>
          </div>
          {/* <div className={cx("shop-products")}>
            <div className={cx("rec-title")}>
              <span>RECOMMENDED FOR YOU</span>
            </div>
            <div className={cx("rec_product-list")}>
              {recProducts.map((item, index) => (
                <Link to="" key={index} className={cx("rec_product_items")}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cx("rec_product-img")}
                  />
                  <div className={cx("rec_content")}>
                    <div className={cx("rec_product-name")}>{item.name}</div>
                    <div className={cx("rec_product-price")}>
                      <div className={cx("real-price")}>{item.price}$</div>
                      <span className={cx("sale-price")}>{item.price}$</span>
                    </div>
                    <div className={cx("rec_rating_sold")}>
                      <div className={cx("product-rating")}>
                        <StarRating
                          rating={item.rating}
                          font={1.2}
                          color={`gold`}
                        />
                      </div>
                      <div className={cx("sold")}>{item.sold}k sold</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className={cx("big_deals")}>
            <div className={cx("big_deal-header")}>
              <img
                src={fire}
                alt="big-deal-img"
                className={cx("big-deal-img")}
              />
              <span className={cx("big-deal-text")}>BIG DEALS</span>
            </div>
            <div className={cx("big_deal-list")}>
              {bigDeals.map((item, index) => (
                <Link to="" key={index} className={cx("big_deal-item")}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cx("big_deal-img")}
                  />
                  <div className={cx("sale-percent")}>-{item.percent}%</div>
                  <div className={cx("big_deal-content")}>
                    <div className={cx("big_deal-name")}>{item.name}</div>
                    <div className={cx("big_deal-price-sold")}>
                      <div className={cx("real-price")}>{item.price}$</div>
                      <span className={cx("sale-price")}>{item.price}$</span>
                      <div className={cx("sold")}>
                        {(() => {
                          let rs = "";
                          if (item.sold >= 1000) {
                            const sold = item.sold / 1000;
                            const rounded = Math.round(sold * 10) / 10;
                            return (rs += rounded + "k");
                          } else {
                            return (rs += item.sold);
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
          <div className={cx("top_sales")}>
            <div className={cx("top_sale-header")}>TOP SALES</div>
            <div className={cx("top_sale-list")}>
              {topSales.map((item, index) => (
                <Link to="" key={index} className={cx("top_sale-item")}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cx("top_sale-img")}
                  />
                  <div className={cx("top_sale-content")}>
                    <div className={cx("top_sale-name")}>{item.name}</div>
                    <div className={cx("top_sale-price")}>
                      <div className={cx("real-price")}>{item.price}$</div>
                      <span className={cx("sale-price")}>{item.price}$</span>
                    </div>
                    <div className={cx("rating_sold")}>
                      <div className={cx("product-rating")}>
                        <StarRating
                          rating={item.rating}
                          font={1.2}
                          color={`gold`}
                        />
                      </div>
                      <div className={cx("sold")}>
                        {(() => {
                          let rs = "";
                          if (item.sold >= 1000) {
                            const sold = item.sold / 1000;
                            const rounded = Math.round(sold * 10) / 10;
                            return (rs += rounded + "k");
                          } else {
                            return (rs += item.sold);
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
          <div className={cx("new_products")}>
            <div className={cx("new_product-head")}>NEW PRODUCTS</div>
            <div className={cx("new_product-list")}>
              {newProducts.map((item, index) => (
                <Link to="" key={index} className={cx("new_product-item")}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cx("new_product-img")}
                  />
                  <div className={cx("new_product-content")}>
                    <div className={cx("new_product-name")}>{item.name}</div>
                    <div className={cx("new_product-price")}>{item.price}$</div>
                  </div>
                </Link>
              ))}
            </div>
          </div> */}
          <div className={cx("shop_sort-bar")} id="product_list">
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

          <div className={cx("all_products")}>
            <div className={cx("all_product-list")}>
              {shop.products.map((item, index) => (
                <Link
                  to={"/product?productId=" + item.id}
                  key={index}
                  className={cx("all_product_items")}
                >
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className={cx("all_product-img")}
                  />
                  <div className={cx("all_product-content")}>
                    <div className={cx("all_product-name")}>{item.name}</div>
                    <div className={cx("all_product-price")}>{item.price}$</div>
                    <div className={cx("all_rating_sold")}>
                      <div className={cx("product-rating")}>
                        <StarRating
                          rating={item.rating}
                          font={1.2}
                          color={`gold`}
                        />
                      </div>
                      <div className={cx("sold")}>
                        {(() => {
                          let rs = "";
                          if (item.sold >= 1000) {
                            const sold = item.sold / 1000;
                            const rounded = Math.round(sold * 10) / 10;
                            return (rs += rounded + "k");
                          } else {
                            return (rs += item.sold);
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
              disabled={cmtPage === shop.maxPage}
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

export default Shop;
