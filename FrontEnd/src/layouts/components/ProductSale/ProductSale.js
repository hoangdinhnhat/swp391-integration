import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import product from "~/assets/images/bird-cage.png";
import product1 from "~/assets/images/bird-food.png";
import product2 from "~/assets/images/bird-medicine.png";
import product3 from "~/assets/images/bird.png";
import product4 from "~/assets/images/bird-accessory.png";
import product5 from "~/assets/images/product.png";
import avatar from "~/assets/images/user-avatar.png";
import styles from "./ProductSale.module.scss";

const cx = classNames.bind(styles);
const filterBtns = ["All", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"];
const products = [
  {
    type: "video",
    src: "https://play-ws.vod.shopee.com/api/v4/11110103/mms/vn_7a40b4ce-8cbe-4f13-ae8e-355f3aa3d07b_000230.16000461675675278.mp4",
  },
  { type: "img", src: product1 },
  { type: "img", src: product2 },
  { type: "img", src: product3 },
  { type: "img", src: product4 },
  { type: "img", src: product5 },
];
const commentPageBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function ProductSale() {
  const [type, setType] = useState("All");
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [cmtPage, setCmtPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);
  const videoRef = useRef();
  const timeID = useRef();
  const [comment, setComment] = useState({
    ratings: [1, 2, 3, 4, 5],
    rating: 2,
  });
  const [preview, setPreview] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/publics/time").then((res) => {
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
    .catch(e => {
      console.log(e)
    });
    return () => {
      clearInterval(timeID.current);
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

  return (
    <>
      <Header />
      <div className={cx("product-wrapper")}>
        <div className={cx("product-container")}>
          <div className={cx("product-main")}>
            {/*------Product image------*/}
            <div className={cx("product-img")}>
              <img src={product} alt="product-img" />
            </div>
            <div className={cx("product-content")}>
              {/*------Product Name------*/}
              <div className={cx("product-name")}>
                <span className={cx("name")}>
                  Prevue Pet Products Square Roof Parrot Cage, Standing
                  Birdcage, Black
                </span>
              </div>
              {/*------Product Status------*/}
              <div className={cx("product-status")}>
                <div className={cx("product-status-left")}>
                  <div className={cx("product-rating")}>
                    <span className={cx("rating-text")}>4.8</span>
                    <div className={cx("rating-star")}>
                      <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                      <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                      <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                      <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                      <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                    </div>
                  </div>
                  <div className={cx("rating-status")}>
                    <span className={cx("rating-number")}>8,3k</span>
                    <span className={cx("rate-status")}>Ratings</span>
                  </div>
                  <div className={cx("selling-status")}>
                    <span className={cx("sold-number")}>49,8k</span>
                    <span className={cx("sold-status")}>Sold</span>
                  </div>
                </div>
                <div className={cx("product-status-right")}>
                  <button className={cx("report-btn")}>Report</button>
                </div>
              </div>
              {/*------Product Flash Sale------*/}
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
              {/*------Product Price------*/}
              <div className={cx("product-price")}>
                <div className={cx("price-real")}>$3000</div>
                <div className={cx("price-sale")}>$1000</div>
                <div className={cx("sale-percent")}>20% OFF</div>
              </div>
              {/*------Product Description------*/}
              <div className={cx("product-description")}>
                <div className={cx("available")}>
                  <span className={cx("content")}>Availability</span>
                  <span className={cx("sub-content")}>In stock</span>
                </div>
                <div className={cx("category")}>
                  <span className={cx("content")}>Category</span>
                  <span className={cx("sub-content")}>Bird cage</span>
                </div>
                <div className={cx("shipping")}>
                  <span className={cx("content")}>Shipping</span>
                  <div className={cx("shipping-options")}>
                    <div className={cx("shipping-to")}>
                      <i className={cx("fa-light fa-truck", "truck-icon")}></i>
                      <span className={cx("text")}>Shipping To</span>
                      <span className={cx("shipping-content")}>
                        Vinhome Grand Park
                      </span>
                    </div>
                    <div className={cx("shipping-fee")}>
                      <span className={cx("text")}>Shipping Fee</span>
                      <span className={cx("shipping-content")}>35.000</span>
                    </div>
                  </div>
                </div>
              </div>
              {/*------Product Quantity------*/}
              <div className={cx("product-quantity")}>
                <span className={cx("quantity-text")}>Quantity</span>
                <div className={cx("quantity")}>
                  <button className={cx("minus")}>
                    <i className={cx("fa-solid fa-minus", "minus-icon")}></i>
                  </button>
                  <input type="number" className={cx("text")} />
                  <button className={cx("plus")}>
                    <i className={cx("fa-solid fa-plus", "plus-icon")}></i>
                  </button>
                </div>
                <div className={cx("quantity-remaining")}>
                  <span className={cx("remaining-quantity")}>6162</span>
                  <span className={cx("remaining-text")}>
                    {" "}
                    pieces available
                  </span>
                </div>
              </div>
              {/*------Add to cart & Buy now------*/}
              <div className={cx("product-buy")}>
                <button className={cx("add")}>
                  <i className={cx("fa-sharp fa-light fa-cart-plus")}></i>
                  <span>Add To Cart</span>
                </button>
                <button className={cx("buy")}>Buy Now</button>
              </div>
            </div>
          </div>
          <div className={cx("product-related")}>
            <div className={cx("related-title")}>
              <span className={cx("title")}>Related Products</span>
            </div>
            <div className={cx("related-list")}>
              <Link to="" className={cx("related-product")}>
                <div className={cx("product-img")}>
                  <img src={product} alt="related-product-img" />
                </div>
                <div className={cx("product-name")}>
                  Prevue Pet Products Square Roof Parrot Cage, Standing
                  Birdcage, Black
                </div>
                <div className={cx("product-price")}>
                  <span className={cx("price")}>$1000</span>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("shop-related")}>
            <div className={cx("shop-left")}>
              <div className={cx("shop-avatar")}>
                <img src={avatar} alt="shop-avatar" />
              </div>
              <div className={cx("shop-info")}>
                <div className={cx("shop-name")}>
                  <span className={cx("name")}>Shop name</span>
                </div>
                <div className={cx("shop-active")}>
                  <span className={cx("time-active")}>
                    Active 11 minutes ago
                  </span>
                </div>
                <div className={cx("shop-contact")}>
                  <button className={cx("chat")}>
                    <i className={cx("fa-solid fa-messages", "icon-chat")}></i>
                    <span className={cx("chat-text")}>Chat Now</span>
                  </button>
                  <Link to="" className={cx("view")}>
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
                <span className={cx("quantity")}>281k</span>
              </div>
              <div className={cx("response-rate", "container")}>
                <span className={cx("title")}>Response Rate</span>
                <span className={cx("quantity")}>95%</span>
              </div>
              <div className={cx("follower", "container")}>
                <span className={cx("title")}>Followers</span>
                <span className={cx("quantity")}>600,2k</span>
              </div>
              <div className={cx("products", "container")}>
                <span className={cx("title")}>Products</span>
                <span className={cx("quantity")}>100</span>
              </div>
              <div className={cx("response-time", "container")}>
                <span className={cx("title")}>Response Time</span>
                <span className={cx("quantity")}>within hours</span>
              </div>
            </div>
          </div>
          <div className={cx("product-detail")}>
            <div className={cx("product-specifications")}>
              <div className={cx("specification-title")}>
                Product Specifications
              </div>
              <div className={cx("specification-content")}>
                <div className={cx("category", "container")}>
                  <span className={cx("title")}>Category</span>
                  <span className={cx("content")}>Bird cage</span>
                </div>
                <div className={cx("brand", "container")}>
                  <span className={cx("title")}>Brand</span>
                  <span className={cx("content")}>No brand</span>
                </div>
                <div className={cx("quantity_available", "container")}>
                  <span className={cx("title")}>Quantity available</span>
                  <span className={cx("content")}>200</span>
                </div>
                <div className={cx("quantity-remaining", "container")}>
                  <span className={cx("title")}>Quantity remaining</span>
                  <span className={cx("content")}>100</span>
                </div>
              </div>
            </div>
            <div className={cx("product-description")}>
              <div className={cx("description-title")}>Product Description</div>
              <div className={cx("description-content")}>
                <pre className={cx("text")}>
                  {`
                  
                  `}
                </pre>
              </div>
            </div>
          </div>
          <div className={cx("product-ratings")}>
            <div className={cx("product-rating-title")}>
              <span className={cx("title")}>Product Ratings</span>
            </div>
            <div className={cx("product-rating-container")}>
              <div className={cx("rating-overview")}>
                <div className={cx("rating-text")}>
                  <span className={cx("rating-quantity")}>4.9</span>
                  <span className={cx("rating-total")}> out of 5</span>
                </div>
                <div className={cx("rating-star")}>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                </div>
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
            <div className={cx("product-comment-list")}>
              <div className={cx("product-comment")}>
                <div className={cx("user_avatar")}>
                  <img src={avatar} alt="user-avatar" />
                </div>
                <div className={cx("content_comment")}>
                  <div className={cx("user_comment")}>
                    <div className={cx("user_name")}>
                      <span className={cx("name")}>User name</span>
                    </div>
                    <div className={cx("user_rating")}>
                      {comment.ratings.map((r, index) =>
                        r <= comment.rating ? (
                          <i
                            key={index}
                            className={cx("fa-solid fa-star", "rate_icon")}
                          ></i>
                        ) : (
                          <i
                            key={index}
                            className={cx("fa-regular fa-star", "rate_icon")}
                          ></i>
                        )
                      )}
                    </div>
                    <div className={cx("date_time-comment")}>
                      <span className={cx("date-time")}>2023-05-26 16:00</span>
                    </div>
                  </div>
                  <div className={cx("comment-content")}>
                    <span className={cx("comment-text")}>
                      Mua đợt sale nên được giảm giá. Được tặng kèm thêm dưỡng
                      chất nhỏ xinh. Shop đóng gói cẩn thận, giao hàng nhanh.
                      Tiếp tục ủng hộ shop
                    </span>
                  </div>
                  <div className={cx("comment-wrapper")}>
                    <div className={cx("comment-image")}>
                      {products.map((productMedia, index) => {
                        if (productMedia.type === "img") {
                          return (
                            <img
                              key={index}
                              src={productMedia.src}
                              alt="img-comment"
                              onClick={""}
                            />
                          );
                        }
                        return (
                          <div className={cx("comment-video")}>
                            <video
                              src="https://play-ws.vod.shopee.com/api/v4/11110103/mms/vn_7a40b4ce-8cbe-4f13-ae8e-355f3aa3d07b_000230.16000461675675278.mp4"
                              onClick={""}
                              ref={videoRef}
                            />
                            <div className={cx("icon-video")}>
                              <i className={cx("fa-solid fa-video")}></i>
                              <span>
                                {(() => {
                                  let duration =
                                    videoRef.current &&
                                    Math.floor(videoRef.current.duration);
                                  let rs = "00:00";
                                  if (duration) {
                                    let minute = Math.floor(duration / 60);
                                    let seconds = duration % 60;
                                    let secString = "";
                                    if (seconds < 10) secString = "0" + seconds;
                                    else secString = seconds;
                                    rs = minute + ":" + secString;
                                  }
                                  return rs;
                                })()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductSale;
