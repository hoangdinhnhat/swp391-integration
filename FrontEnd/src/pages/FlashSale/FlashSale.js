import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "~/layouts/components/Header/";
import Footer from "~/layouts/components/Footer/";
import banner from "~/assets/images/banner.png";
import birdFood from "~/assets/images/bird-food.png";
import birdMedicine from "~/assets/images/bird-medicine.png";
import birdCage from "~/assets/images/bird-cage.png";
import bird from "~/assets/images/bird.png";
import styles from "./FlashSale.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

const filterBtns = ["birds", "foods", "medicines", "cages", "accessories"];

const products = [
  {
    product_img: bird,
    product_name: "Fruit Blend® Flavor with Natural Flavors",
    product_rating: 0,
    product_price: 200,
    product_sale_percentage: 20,
    product_price_sale: 100,
  },
  {
    product_img: birdMedicine,
    product_name: "Fruit Blend® Flavor with Natural Flavors",
    product_rating: 0,
    product_price: 200,
    product_sale_percentage: 20,
    product_price_sale: 100,
  },
  {
    product_img: birdCage,
    product_name: "Fruit Blend® Flavor with Natural Flavors",
    product_rating: 0,
    product_price: 200,
    product_price_sale: 100,
    product_sale_percentage: 20,
  },
  {
    product_img: birdFood,
    product_name: "Fruit Blend® Flavor with Natural Flavors",
    product_rating: 0,
    product_price: 200,
    product_price_sale: 100,
    product_sale_percentage: 20,
  },
];
function FlashSale() {
  const [type, setType] = useState("birds");
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const timeID = useRef();

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

  // useEffect(() => {
  //   if (countdown.minute === 0 && countdown.second === 0) {
  //     setMinute(30);
  //     setSecond(59);
  //   }
  // }, [countdown.minute, countdown.second]);

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
            {products.map((product, index) => (
              <Link to="" className={cx("flash_sale-product")}>
                <div className={cx("product-sale")}>
                  <span className={cx("sale")}>
                    -{product.product_sale_percentage}%
                  </span>
                </div>
                <div className={cx("product-image")}>
                  <img src={product.product_img} alt="product-img" />
                </div>
                <div className={cx("product-name")}>
                  <span className={cx("name-text")}>
                    {product.product_name}
                  </span>
                </div>
                <div className={cx("product-rating")}>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                </div>
                <div className={cx("product-price")}>
                  <span className={cx("price-before")}>
                    ${product.product_price}
                  </span>
                  <span className={cx("price-after")}>
                    ${product.product_price_sale}
                  </span>
                </div>
                <div className={cx("product-feature")}>
                  <div className={cx("product-status")}>
                    <div className={cx("loading")}>
                      <span className={cx("loading-text")}>SELLING FAST</span>
                    </div>
                  </div>
                  <button className={cx("buy-btn")}>Buy now</button>
                </div>
              </Link>
            ))}
            {products.map((product, index) => (
              <Link to="" className={cx("flash_sale-product")}>
                <div className={cx("product-sale")}>
                  <span className={cx("sale")}>
                    -{product.product_sale_percentage}%
                  </span>
                </div>
                <div className={cx("product-image")}>
                  <img src={product.product_img} alt="product-img" />
                </div>
                <div className={cx("product-name")}>
                  <span className={cx("name-text")}>
                    {product.product_name}
                  </span>
                </div>
                <div className={cx("product-rating")}>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                </div>
                <div className={cx("product-price")}>
                  <span className={cx("price-before")}>
                    ${product.product_price}
                  </span>
                  <span className={cx("price-after")}>
                    ${product.product_price_sale}
                  </span>
                </div>
                <div className={cx("product-feature")}>
                  <div className={cx("product-status")}>
                    <div className={cx("loading")}>
                      <span className={cx("loading-text")}>SELLING FAST</span>
                    </div>
                  </div>
                  <button className={cx("buy-btn")}>Buy now</button>
                </div>
              </Link>
            ))}
            {products.map((product, index) => (
              <Link to="" className={cx("flash_sale-product")}>
                <div className={cx("product-sale")}>
                  <span className={cx("sale")}>
                    -{product.product_sale_percentage}%
                  </span>
                </div>
                <div className={cx("product-image")}>
                  <img src={product.product_img} alt="product-img" />
                </div>
                <div className={cx("product-name")}>
                  <span className={cx("name-text")}>
                    {product.product_name}
                  </span>
                </div>
                <div className={cx("product-rating")}>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                </div>
                <div className={cx("product-price")}>
                  <span className={cx("price-before")}>
                    ${product.product_price}
                  </span>
                  <span className={cx("price-after")}>
                    ${product.product_price_sale}
                  </span>
                </div>
                <div className={cx("product-feature")}>
                  <div className={cx("product-status")}>
                    <div className={cx("loading")}>
                      <span className={cx("loading-text")}>SELLING FAST</span>
                    </div>
                  </div>
                  <button className={cx("buy-btn")}>Buy Now</button>
                </div>
              </Link>
            ))}
            {products.map((product, index) => (
              <Link to="" className={cx("flash_sale-product")}>
                <div className={cx("product-sale")}>
                  <span className={cx("sale")}>
                    -{product.product_sale_percentage}%
                  </span>
                </div>
                <div className={cx("product-image")}>
                  <img src={product.product_img} alt="product-img" />
                </div>
                <div className={cx("product-name")}>
                  <span className={cx("name-text")}>
                    {product.product_name}
                  </span>
                </div>
                <div className={cx("product-rating")}>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                </div>
                <div className={cx("product-price")}>
                  <span className={cx("price-before")}>
                    ${product.product_price}
                  </span>
                  <span className={cx("price-after")}>
                    ${product.product_price_sale}
                  </span>
                </div>
                <div className={cx("product-feature")}>
                  <div className={cx("product-status")}>
                    <div className={cx("loading")}>
                      <span className={cx("loading-text")}>SELLING FAST</span>
                    </div>
                  </div>
                  <button className={cx("buy-btn")}>Buy now</button>
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
