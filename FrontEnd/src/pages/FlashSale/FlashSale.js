import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import Header from "~/layouts/components/Header/";
import Footer from "~/layouts/components/Footer/";
import StarRating from "~/layouts/components/StarRating";

import banner from "~/assets/images/banner.png";
import styles from "./FlashSale.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

const filterBtns = ["all", "bird", "bird food", "bird cage", "bird accessory"];

function FlashSale() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productSales, setProductSales] = useState([
    {
      product: {
        id: 0,
        name: "",
        price: 0,
        images: [
          {
            id: 0,
            url: "",
          },
        ],
        rating: 0,
      },
      salePercent: 0,
      saleQuantity: 0,
      sold: 0,
    },
  ]);

  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [type, setType] = useState("all");
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const timeID = useRef();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.title = "Flash Deals | Bird Trading Platform";
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
    if (page !== 1 && !end) {
      let url = "/api/v1/publics/event/1?page=" + page;
      if (searchParams.get("priority")) {
        url += "&priority=" + searchParams.get("priority");
      }
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          if (res.data.length === 0) {
            setEnd(true);
            return;
          }
          setProductSales((prev) => [...prev, ...res.data]);
        })
        .catch((e) => console.log(e));
    }
  }, [page]);

  useEffect(() => {
    let pageNum = page;
    const id = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage(pageNum + 1);
        pageNum += 1;
      }
    };
    window.addEventListener("scroll", id);
  }, []);

  useEffect(() => {
    let url = "/api/v1/publics/event/1?filter=" + type;
    if (searchParams.get("priority")) {
      url += "&priority=" + searchParams.get("priority");
    }
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setProductSales(res.data);
        setPage(1);
      })
      .catch((e) => console.log(e));
  }, [type]);

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

  const loading = {
    maxWidth: "160px",
    height: "20px",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#f3afafcd",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const beforeLoading = {
    content: '""',
    maxWidth: "160px",
    height: "20px",
    position: "absolute",
    top: "0",
    left: "0",
    borderRadius: "12px 0 0 12px",
    background: "linear-gradient(#ee4d2d,#ff7337)",
  };

  const saleCondition = (productSale) => {
    return productSale && productSale.saleQuantity > productSale.sold;
  };

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <>
      <Header />
      <div className={cx("flash_sale-wrapper")}>
        <div className={cx("flash_sale-container")}>
          <div className={cx("flash_sale-countdown")}>
            <div className={cx("flash_sale-countdown-content")}>
              <div className={cx("flash_sale-head")}>
                <span className={cx("flash_sale-text1")}>
                  F<i className={cx("fa-solid fa-bolt-lightning")}></i>
                  ASH <span className={cx("flash_sale-text2")}>SALE</span>
                </span>
              </div>
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
          <div className={cx("flash_sale-banner")}>
            <img src={banner} alt="flash_sale-img" />
          </div>
          <div className={cx("flash_sale-filter")}>
            {filterBtns.map((btn) => (
              <button
                className={
                  type === btn
                    ? cx("filter-bird-btn-active")
                    : cx("filter-bird-btn")
                }
                key={btn}
                onClick={() => setType(btn)}
              >
                {btn.toUpperCase()}
              </button>
            ))}
          </div>
          <div className={cx("flash_sale-list")}>
            {productSales.map((ps, index) => (
              <Link
                to={"/product?productId=" + ps.product.id}
                className={cx("flash_sale-product")}
                key={index}
              >
                <div className={cx("product-sale")}>
                  <span className={cx("sale")}>-{ps.salePercent}%</span>
                </div>
                <img
                  src={ps.product.images[0].url}
                  alt="product-img"
                  className={cx("product-image")}
                />
                <div className={cx("product-content")}>
                  <div className={cx("product-name")}>
                    <span className={cx("name-text")}>{ps.product.name}</span>
                  </div>
                  <div className={cx("product-rating")}>
                    <StarRating
                      rating={ps.product.rating}
                      font={1.6}
                      color={`gold`}
                    />
                  </div>
                  {saleCondition(ps) ? (
                    <div className={cx("product-price")}>
                      <span className={cx("price-before")}>
                        ${ps.product.price}
                      </span>
                      <span className={cx("price-after")}>
                        $
                        {roundedFloat(
                          ps.product.price * (1 - ps.salePercent / 100)
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className={cx("product-price")}>
                      <span className={cx("price-before")}>
                        ${ps.product.price}
                      </span>
                    </div>
                  )}
                  <div className={cx("product-feature")}>
                    <div className={cx("product-status")}>
                      <div
                        className={cx("loading")}
                        style={{
                          ...loading,
                          width: `calc((${ps.saleQuantity}) * 160px)`,
                        }}
                      >
                        <div
                          className={cx("before-element")}
                          style={{
                            ...beforeLoading,
                            width: `calc(((${ps.sold} * 160) / ${ps.saleQuantity}) * 1px)`,
                          }}
                        ></div>
                        <span className={cx("loading-text")}>
                          {(() => {
                            if ((ps.sold / ps.saleQuantity) * 100 <= 50) {
                              return "SELLING FAST";
                            } else if (
                              (ps.sold / ps.saleQuantity) * 100 >= 50 &&
                              (ps.sold / ps.saleQuantity) * 100 <= 75
                            ) {
                              return `${ps.sold} SOLD`;
                            } else if ((ps.sold / ps.saleQuantity) * 100 > 75) {
                              return `ONLY ${ps.saleQuantity - ps.sold} LEFT`;
                            } else {
                              return "";
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                    <button className={cx("buy-btn")}>Buy now</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FlashSale;
