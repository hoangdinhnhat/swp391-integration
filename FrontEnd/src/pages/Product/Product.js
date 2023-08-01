import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios, { HttpStatusCode } from "axios";

import { UserContext } from "~/userContext/Context";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import Report from "./Report";
import Toast from "./Toast";
import Comment from "./Comment";
import ProductImage from "./ProductImage";
import StarRating from "~/layouts/components/StarRating";
import ChatPupup from "~/layouts/components/ChatPopup";
import { Cartcontext } from "~/context/Context";

import avatar from "~/assets/images/user-avatar.png";
import styles from "./Product.module.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const cx = classNames.bind(styles);
const filterBtns = ["All", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"];
const commentRating = [1, 2, 3, 4, 5];
const commentPageBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

//Control Best Seller Button
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={cx("control-btn")} onClick={onClick}>
      <button className={cx("prev")}>
        <i className={cx("fa-regular fa-chevron-left")}></i>
      </button>
    </div>
  );
};
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={cx("control-btn")} onClick={onClick}>
      <button className={cx("next")}>
        <i className={cx("fa-solid fa-chevron-right")}></i>
      </button>
    </div>
  );
};
const settings = {
  slidesToShow: 6,
  slidesToScroll: 2,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

var stompClient = null;

function Product() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const user = context.state;
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    price: 1000,
    sold: 111200,
    available: 10,
    rating: 3.7,
    totalRatings: 3000,
    brand: "No brand",
    category: {
      id: 0,
      name: "Bird",
    },
    categoryGroup: {
      id: 0,
      name: "Red-whiskered bulbul",
    },
    shop: {
      id: -1,
      avatar: avatar,
      name: "Shop name",
      active: "Active 11 minutes ago",
      ratings: "281000",
      products: "12500",
      responseRate: "95",
      responseTime: "within hours",
      followers: "62150",
      address: {
        province: {
          id: 0,
          name: "",
        },
        district: {
          id: 0,
          name: "",
        },
        ward: {
          id: 0,
          name: "",
        },
      },
    },
    images: [],
    productDetailInfos: [],
    video: "",
    attachWiths: [
      {
        name: "African bird's food",
        price: 1000,
        available: 20,
        sold: 0,
        images: [
          {
            id: 101,
            url: "/api/v1/product/image/21?imgId=1",
          },
        ],
      },
    ],
    feedbacks: [],
    relatedTo: [
      {
        product: {
          name: "",
          images: [
            {
              url: "",
            },
          ],
        },
        salePercent: undefined,
        saleQuantity: 0,
        sold: 0,
      },
    ],
  });
  const [type, setType] = useState("All");
  const [second, setSecond] = useState(0);
  const [calculatObject, setCalculateObject] = useState();
  const [shippingFee, setShippingFee] = useState("0");
  const [minute, setMinute] = useState(0);
  const [cmtPage, setCmtPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);
  const [openReport, setOpenReport] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [valueQuantity, setValueQuantity] = useState(1);
  const timeID = useRef();
  const location = useLocation();
  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
  const [isBuyed, setIsBuyed] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    let productId = searchParams.get("productId");
    axios
      .get("/api/v1/publics/product/" + productId)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);

        document.title = `${res.data.name} | Bird Trading Platform`;
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (user) {
      setCalculateObject({
        from_province_id: 201,
        from_district_id: 3440,
        service_id: 53320,
        service_type_id: 2,
        to_province_id: user.defaultReceiveInfo
          ? user.defaultReceiveInfo.province.id
          : 201,
        to_district_id: user.defaultReceiveInfo
          ? user.defaultReceiveInfo.district.id
          : 1489,
        to_ward_code: user.defaultReceiveInfo
          ? "" + user.defaultReceiveInfo.ward.id
          : "1A0218",
        height: 50,
        length: 20,
        weight: 200,
        width: 20,
        insurance_value: 10000,
        cod_failed_amount: 2000,
        coupon: null,
      });
    }
  }, [user]);

  async function vndToUsd(amount) {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/VND"
    );
    const data = await response.json();
    const rate = data.rates.USD;
    return amount * rate;
  }

  useEffect(() => {
    if (calculatObject) {
      axios
        .post(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          calculatObject,
          {
            headers: {
              "Content-Type": "application/json",
              Token: "fc0ea700-c65d-11ed-ab31-3eeb4194879e",
            },
          }
        )
        .then(async (res) => {
          console.log(res);
          let usd = await vndToUsd(res.data.data.total);
          let shippingFee = Math.round((usd + Number.EPSILON) * 100) / 100;
          setShippingFee("$" + shippingFee);
        })
        .catch((e) => console.log(e));
    }
  }, [calculatObject]);

  useEffect(() => {
    let productId = searchParams.get("productId");
    axios
      .get("/api/v1/publics/product/" + productId)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        document.title = `${res.data.name} | Bird Trading Platform`;
      })
      .catch((e) => console.log(e));
  }, [searchParams.get("productId")]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
      .get("/api/v1/publics/time")
      .then((res) => {
        let now2 = new Date(res.data);
        now2.setHours(now2.getHours() + 1);
        now2.setMinutes(0);
        now2.setSeconds(0);
        let end = now2.getTime();
        timeID.current = setInterval(() => {
          let now = new Date().getTime();
          let distance = end - now;
          let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
          let second = Math.floor((distance % (60 * 1000)) / 1000);
          setMinute(minute);
          setSecond(second);
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      clearInterval(timeID.current);
    };
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setOpenToast(false);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [openToast]);

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

  const handleSkipPage = (e) => {
    e.preventDefault();
    let page = parseInt(e.target.value);
    let maxFake = maxPage;
    let minFake = minPage;
    if (page > commentPageBtns.length) {
      e.target.value = "";
      return;
    }
    if (page > maxFake) {
      while (page > maxFake) {
        let max_length = commentPageBtns.length;
        if (max_length - maxFake >= 3) {
          maxFake = maxFake + 3;
          minFake = minFake + 3;
        } else {
          let distance = max_length - maxFake;
          maxFake = maxFake + distance;
          minFake = minFake + distance;
        }
      }
      setMinPage(minFake);
      setMaxPage(maxFake);
    } else if (page < minFake) {
      while (page < minFake) {
        let min = commentPageBtns[0];
        if (minFake - min >= 3) {
          maxFake = maxFake - 3;
          minFake = minFake - 3;
        } else {
          let distance = minFake - min;
          maxFake = maxFake - distance;
          minFake = minFake - distance;
        }
      }
      setMinPage(minFake);
      setMaxPage(maxFake);
    }
    e.target.value = "";
    setCmtPage(page);
  };

  const handleDescrease = () => {
    if (valueQuantity === 1) {
      return;
    }
    setValueQuantity(valueQuantity - 1);
  };

  const handleIncrease = () => {
    if (valueQuantity === product.available) {
      return;
    }
    setValueQuantity(valueQuantity + 1);
  };

  const saleCondition = (item) => {
    if (item) {
      return item.salePercent && item.saleQuantity > item.sold;
    }

    return (
      product.productSale &&
      product.productSale.saleQuantity > product.productSale.sold
    );
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (user) {
      setIsBuyed(true);
      dispatch({
        type: "ADD",
        payload: { pId: product.id, quantity: valueQuantity },
      });
    } else navigate("/login");
  };

  useEffect(() => {
    if (isBuyed) {
      navigate("/cart", {
        state: [product.id],
      });
    }
  }, [Globalstate.state]);

  const handleSendSpecialOrder = (e) => {
    e.preventDefault();
    if (user) {
      axios
        .post(
          "/api/v1/users/order/special/create?id=" +
            product.id +
            "&quantity=" +
            valueQuantity
        )
        .then((res) => {
          navigate("/purchase/contact");
        })
        .catch((e) => {
          if (e.response.status === HttpStatusCode.BadRequest) {
            alert("Please add your receive info!");
          }
        });
    } else navigate("/login");
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
      {openReport && (
        <Report
          closeReport={setOpenReport}
          product={product.id}
          type="product"
        />
      )}
      {openToast && <Toast />}
      <Header />
      <div className={cx("product-wrapper")}>
        <div className={cx("product-container")}>
          <ChatPupup openChat={openChat} setOpenChat={setOpenChat} />
          {/*------Product main------*/}
          <div className={cx("product-main")}>
            {/*------Product image------*/}
            <ProductImage
              previewImage={product.images.map((p) => p.url)}
              previewVideo={product.video}
              quantitySoldout={product.available}
            />
            <div className={cx("product-content")}>
              {/*------Product Name------*/}
              <div className={cx("product-name")}>
                <span className={cx("name")}>{product.name}</span>
              </div>
              {/*------Product Status------*/}
              <div className={cx("product-status")}>
                <div className={cx("product-status-left")}>
                  <div className={cx("product-rating")}>
                    <span className={cx("rating-text")}>{roundedFloat(product.rating)}</span>
                    <StarRating
                      rating={product.rating}
                      font={1.6}
                      color={`var(--flash_sale-primary)`}
                    />
                  </div>
                  <div className={cx("rating-status")}>
                    <span className={cx("rating-number")}>
                      {(() => {
                        let rs = "";
                        if (product.feedbacks.length >= 1000) {
                          const rating = product.feedbacks.length / 1000;
                          const rounded = Math.round(rating * 10) / 10;
                          return (rs += rounded + "k");
                        } else {
                          return (rs += product.feedbacks.length);
                        }
                      })()}
                    </span>
                    <span className={cx("rate-status")}>Ratings</span>
                  </div>
                  <div className={cx("selling-status")}>
                    <span className={cx("sold-number")}>
                      {(() => {
                        let rs = "";
                        if (product.sold >= 1000) {
                          const sold = product.sold / 1000;
                          const rounded = Math.round(sold * 10) / 10;
                          return (rs += rounded + "k");
                        } else {
                          return (rs += product.sold);
                        }
                      })()}
                    </span>
                    <span className={cx("sold-status")}>Sold</span>
                  </div>
                </div>
                <div className={cx("product-status-right")}>
                  {!(
                    user &&
                    user.shopDTO &&
                    user.shopDTO.id == product.shop.id
                  ) && (
                    <button
                      className={cx("report-btn")}
                      onClick={() => setOpenReport(true)}
                    >
                      Report
                    </button>
                  )}
                </div>
              </div>
              {/*------Product Flash Sale------*/}
              {saleCondition() && (
                <div className={cx("product-flash_sale")}>
                  <div className={cx("flash_sale-title")}>
                    <span className={cx("flash_sale-text1")}>
                      F<i className={cx("fa-solid fa-bolt-lightning")}></i>
                      ASH <span className={cx("flash_sale-text2")}>SALE</span>
                    </span>
                  </div>
                  <div className={cx("flash_sale-countdown")}>
                    <div className={cx("flash_sale-countdown-end")}>
                      <i className={cx("fa-light fa-clock", "clock-icon")}></i>
                      <span>ENDS IN</span>
                    </div>
                    <div className={cx("flash_sale-countdown-time")}>
                      <span className={cx("countdown-minute")}>
                        {minute < 10 ? "0" + minute : minute}
                      </span>
                      <span className={cx("countdown-second")}>
                        {second < 10 ? "0" + second : second}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {/*------Product Price------*/}
              <div className={cx("product-price")}>
                <div
                  className={
                    saleCondition() ? cx("price-real") : cx("price-sale")
                  }
                >
                  ${product.price}
                </div>
                {saleCondition() && (
                  <div className={cx("price-sale")}>
                    $
                    {roundedFloat(
                      product.price *
                        (1 - product.productSale.salePercent / 100)
                    )}
                  </div>
                )}
                {saleCondition() && (
                  <div className={cx("sale-percent")}>
                    {product.productSale.salePercent}% OFF
                  </div>
                )}
              </div>
              {/*------Product Description------*/}
              <div className={cx("product-description")}>
                <div className={cx("available")}>
                  <span className={cx("content")}>Availability</span>
                  <span className={cx("sub-content")}>
                    {product.available === 0 ? "Sold out" : "In stock"}
                  </span>
                </div>
                <div className={cx("category")}>
                  <span className={cx("content")}>Category</span>
                  <span className={cx("sub-content")}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/category?categoryId=" + product.category.id}
                    >
                      {product.category.name + " > "}
                    </Link>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={
                        "/category?categoryGroupId=" + product.categoryGroup.id
                      }
                    >
                      {product.categoryGroup.name}
                    </Link>
                  </span>
                </div>
                <div className={cx("shipping")}>
                  <span className={cx("content")}>Shipping</span>
                  <div className={cx("shipping-options")}>
                    <div className={cx("shipping-to")}>
                      <i className={cx("fa-light fa-truck", "truck-icon")}></i>
                      <span className={cx("text")}>Shipping To</span>
                      <span className={cx("shipping-content")}>
                        {user && user.defaultReceiveInfo
                          ? `${user.defaultReceiveInfo.ward.name}, ${user.defaultReceiveInfo.district.name}, ${user.defaultReceiveInfo.province.name}`
                          : "Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội"}
                      </span>
                    </div>
                    <div className={cx("shipping-fee")}>
                      <span className={cx("text")}>Shipping Fee</span>
                      <span className={cx("shipping-content")}>
                        {shippingFee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/*------Product Quantity------*/}
              <div className={cx("product-quantity")}>
                <span className={cx("quantity-text")}>Quantity</span>
                <div className={cx("quantity")}>
                  <button className={cx("minus")} onClick={handleDescrease}>
                    <i className={cx("fa-solid fa-minus", "minus-icon")}></i>
                  </button>
                  <input
                    type="number"
                    className={cx("text")}
                    value={valueQuantity}
                    onChange={(e) => {
                      if (e.target.value > product.available) {
                        setValueQuantity(product.available);
                      } else if (e.target.value < product.available) {
                        setValueQuantity(1);
                      }
                    }}
                  />
                  <button className={cx("plus")} onClick={handleIncrease}>
                    <i className={cx("fa-solid fa-plus", "plus-icon")}></i>
                  </button>
                </div>
                <div className={cx("quantity-remaining")}>
                  <span className={cx("remaining-quantity")}>
                    {product.available}
                  </span>
                  <span className={cx("remaining-text")}>
                    {" "}
                    pieces available
                  </span>
                </div>
              </div>
              {/*------Add to cart & Buy now------*/}
              <div className={cx("product-buy")}>
                {product.category.name === "Bird" ? (
                  <>
                    <button
                      className={cx("contact")}
                      onClick={handleSendSpecialOrder}
                      disabled={
                        product.available === 0 ||
                        (user &&
                          user.shopDTO &&
                          user.shopDTO.id === product.shop.id)
                      }
                    >
                      <i className={cx("fa-light fa-paper-plane")}></i>
                      <span>Send Request</span>
                    </button>
                    <button
                      className={cx("chat")}
                      onClick={(e) => handleNewConversation(e, product.shop.id)}
                    >
                      <i className={cx("fa-regular fa-message-dots")}></i>
                      <span>Chat</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={cx("add")}
                      disabled={
                        product.available === 0 ||
                        (user &&
                          user.shopDTO &&
                          user.shopDTO.id === product.shop.id)
                      }
                      onClick={() => {
                        if (user) {
                          setOpenToast(true);
                          dispatch({
                            type: "ADD",
                            payload: {
                              pId: product.id,
                              quantity: valueQuantity,
                            },
                          });
                        } else navigate("/login");
                      }}
                    >
                      <i className={cx("fa-sharp fa-light fa-cart-plus")}></i>
                      <span>Add To Cart</span>
                    </button>
                    <button
                      className={cx("buy")}
                      disabled={
                        product.available === 0 ||
                        (user &&
                          user.shopDTO &&
                          user.shopDTO.id === product.shop.id)
                      }
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/*------Product bundled------*/}
          {product.attachWiths.length > 0 && (
            <div className={cx("product-bundled")}>
              <div className={cx("bundled-title")}>
                <span className={cx("title")}>Bundled Products</span>
              </div>
              <div className={cx("bundled-list")}>
                {product.attachWiths.length > 6 ? (
                  <Slider {...settings}>
                    {product.attachWiths.map((bundleProduct, index) => (
                      <Link
                        to={"/product?productId=" + bundleProduct.id}
                        className={cx("bundled-product")}
                        key={index}
                      >
                        <img
                          src={bundleProduct.images[0].url}
                          alt="bundled-product-img"
                          className={cx("product-img")}
                        />

                        <div className={cx("product-content")}>
                          <div className={cx("product-name")}>
                            {bundleProduct.name}
                          </div>
                          <div className={cx("product-price")}>
                            <span className={cx("price")}>
                              ${bundleProduct.price}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </Slider>
                ) : (
                  <div className={cx("list")}>
                    {product.attachWiths.map((bundleProduct, index) => (
                      <Link
                        to={"/product?productId=" + bundleProduct.id}
                        className={cx("bundled-product")}
                        key={index}
                      >
                        <img
                          src={bundleProduct.images[0].url}
                          alt="bundled-product-img"
                          className={cx("product-img")}
                        />
                        <div className={cx("product-content")}>
                          <div className={cx("product-name")}>
                            {bundleProduct.name}
                          </div>
                          <div className={cx("product-price")}>
                            <span className={cx("price")}>
                              ${bundleProduct.price}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {/*------Shop related------*/}
          <div className={cx("shop-related")}>
            <div className={cx("shop-left")}>
              <img
                src={product.shop.shopImage}
                alt="shop-avatar"
                className={cx("shop-avatar")}
              />
              <div className={cx("shop-info")}>
                <div className={cx("shop-name")}>{product.shop.name}</div>
                <div className={cx("shop-active")}>
                  <span className={cx("time-active")}>
                    {product.shop.active}
                  </span>
                </div>
                <div className={cx("shop-contact")}>
                  <button
                    className={cx("chat")}
                    onClick={(e) => handleNewConversation(e, product.shop.id)}
                  >
                    <i className={cx("fa-solid fa-messages", "icon-chat")}></i>
                    <span className={cx("chat-text")}>Chat Now</span>
                  </button>
                  <Link
                    to={"/shop?shopId=" + product.shop.id}
                    className={cx("view")}
                  >
                    <i
                      className={cx(
                        "fa-sharp fa-solid fa-bag-shopping",
                        "icon-view"
                      )}
                    ></i>
                    <span className={cx("view-text")}>View Shop</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={cx("shop-right")}>
              <div className={cx("rating", "container")}>
                <span className={cx("title")}>Ratings</span>
                <span className={cx("quantity")}>
                  {(() => {
                    let rs = "";
                    if (product.shop.rating >= 1000) {
                      const rating = product.shop.rating / 1000;
                      const rounded = Math.round(rating * 10) / 10;
                      return (rs += rounded + "k");
                    } else {
                      return (rs += product.shop.rating);
                    }
                  })()}
                </span>
              </div>
              <div className={cx("response-rate", "container")}>
                <span className={cx("title")}>Response Rate</span>
                <span className={cx("quantity")}>
                  {/* {product.shop.responseRate}% */ 100}%
                </span>
              </div>
              <div className={cx("follower", "container")}>
                <span className={cx("title")}>Followers</span>
                <span className={cx("quantity")}>
                  {(() => {
                    let rs = "";
                    if (product.shop.followers >= 1000) {
                      const follow = product.shop.followers / 1000;
                      const rounded = Math.round(follow * 10) / 10;
                      return (rs += rounded + "k");
                    } else {
                      return (rs += product.shop.followers);
                    }
                  })()}
                </span>
              </div>
              <div className={cx("products", "container")}>
                <span className={cx("title")}>Products</span>
                <span className={cx("quantity")}>
                  {(() => {
                    let rs = "";
                    if (product.shop.products >= 1000) {
                      const pro = product.shop.products / 1000;
                      const rounded = Math.round(pro * 10) / 10;
                      return (rs += rounded + "k");
                    } else {
                      return (rs += product.shop.products);
                    }
                  })()}
                </span>
              </div>
              <div className={cx("response-time", "container")}>
                <span className={cx("title")}>Response Time</span>
                <span className={cx("quantity")}>
                  {product.shop.responseTime}
                </span>
              </div>
            </div>
          </div>
          {/*------Product detail------*/}
          <div className={cx("product-detail")}>
            <div className={cx("product-specifications")}>
              <div className={cx("specification-title")}>
                Product Specifications
              </div>
              <div className={cx("specification-content")}>
                <div className={cx("category", "container")}>
                  <div className={cx("title")}>Category</div>
                  <div className={cx("content")}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/category?categoryId=" + product.category.id}
                    >
                      {product.category.name + " > "}
                    </Link>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={
                        "/category?categoryGroupId=" + product.categoryGroup.id
                      }
                    >
                      {product.categoryGroup.name}
                    </Link>
                  </div>
                </div>
                {product.productDetailInfos.map((item) => (
                  <div key={item.id} className={cx("detail", "container")}>
                    <div className={cx("title")}>
                      {item.categoryDetailInfo.name}
                    </div>
                    <div className={cx("content")}>{item.value}</div>
                  </div>
                ))}
                <div className={cx("quantity_available", "container")}>
                  <div className={cx("title")}>Stock</div>
                  <div className={cx("content")}>{product.available}</div>
                </div>
                <div className={cx("ship-from", "container")}>
                  <div className={cx("title")}>Shops From</div>
                  <div className={cx("content")}>
                    {product.shop.address.province.name}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("product-description")}>
              <div className={cx("description-title")}>Product Description</div>
              <div className={cx("description-content")}>
                <pre className={cx("text")}>
                  {`
                    ${product.description}
                  `}
                </pre>
              </div>
            </div>
          </div>
          {/*------Product rating------*/}
          <div className={cx("product-ratings")}>
            <div className={cx("product-rating-title")}>
              <span className={cx("title")}>Product Ratings</span>
            </div>
            <div className={cx("product-rating-container")}>
              <div className={cx("rating-overview")}>
                <div className={cx("rating-text")}>
                  <span className={cx("rating-quantity")}>
                    {product.rating}
                  </span>
                  <span className={cx("rating-total")}> out of 5</span>
                </div>
                <StarRating
                  rating={product.rating}
                  font={2}
                  color={`var(--flash_sale-primary)`}
                />
              </div>
              <div className={cx("filter-rating")}>
                {filterBtns.map((btn, index) => (
                  <button
                    className={
                      type === btn
                        ? cx("filter-rating-btn-active")
                        : cx("filter-rating-btn")
                    }
                    key={index}
                    onClick={() => setType(btn)}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
            {product.feedbacks.map((feedback, index) => (
              <Comment
                feedback={feedback}
                commentRating={commentRating}
                key={index}
              />
            ))}
            <div className={cx("more-comment")}>
              <input
                className={cx("input-page")}
                type="number"
                onKeyDown={(e) => e.keyCode === 13 && handleSkipPage(e)}
              />
              <button className={cx("prev")} onClick={handlePrevCmtPage}>
                <i className={cx("fa-solid fa-chevron-left", "prev-icon")}></i>
              </button>
              {commentPageBtns.map(
                (btn, index) =>
                  btn <= maxPage &&
                  btn >= minPage && (
                    <button
                      key={index}
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
              <button className={cx("next")} onClick={handleNextCmtPage}>
                <i
                  className={cx(
                    "fa-solid fa-chevron-left fa-rotate-180",
                    "next-icon"
                  )}
                ></i>
              </button>
            </div>
          </div>
          {/*------Product related------*/}
          <div className={cx("product-related")}>
            <div className={cx("related-header")}>Product Related</div>
            <div className={cx("related-list")}>
              {product.relatedTo.map((item, index) => (
                <Link
                  to={"/product?productId=" + item.product.id}
                  key={index}
                  className={cx("related-item")}
                >
                  <img
                    src={item.product.images[0].url}
                    alt="related-img"
                    className={cx("related-img")}
                  />
                  <div className={cx("item-content")}>
                    <div className={cx("name")}>{item.product.name}</div>
                    <div className={cx("price-sold")}>
                      {saleCondition(item) ? (
                        <div className={cx("price")}>
                          <div className={cx("real-price")}>
                            {item.product.price}$
                          </div>
                          <div className={cx("sale-price")}>
                            {roundedFloat(
                              item.product.price * (1 - item.salePercent / 100)
                            )}
                            $
                          </div>
                        </div>
                      ) : (
                        <div className={cx("price")}>
                          <div className={cx("sale-price")}>
                            {item.product.price}$
                          </div>
                        </div>
                      )}
                      <div className={cx("sold")}>{item.product.sold}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
