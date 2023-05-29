import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Rating from "@mui/material/Rating";

import Header from "~/layouts/components/Header/Header";
import Footer from "~/layouts/components/Footer";
import Banner from "~/layouts/components/Banner/";

import bird from "~/assets/images/bird.png";
import birdFood from "~/assets/images/bird-food.png";
import birdMedicine from "~/assets/images/bird-medicine.png";
import birdCage from "~/assets/images/bird-cage.png";
import birdAccessory from "~/assets/images/bird-accessory.png";
import avatar from "~/assets/images/avatar.png";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const categories = [
  {
    image: bird,
    title: "BIRDS",
    to: "/",
  },
  {
    image: birdFood,
    title: "BIRD FOODS",
    to: "/",
  },
  {
    image: birdMedicine,
    title: "BIRD MEDICINES",
    to: "/",
  },
  {
    image: birdCage,
    title: "BIRD CAGES",
    to: "/",
  },
  {
    image: birdAccessory,
    title: "BIRD ACCESSORIES",
    to: "/",
  },
];

const flashSales = [
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.777.000",
  },
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.000.000",
  },
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "200.000",
  },
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "77.000",
  },
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
  },
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
  },
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
  },
  {
    image: birdFood,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
  },
];

const bestSeller = [
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.777.000",
    sells: "100+",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.000.000",
    sells: "100+",
  },
  {
    image: bird,
    name: "Bird B.Gone",
    price: "200.000",
    sells: "200+",
  },
  {
    image: bird,
    name: "Bird Spikes",
    price: "77.000",
    sells: "300+",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
    sells: "400+",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
    sells: "400+",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
    sells: "400+",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
    sells: "400+",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
    sells: "400+",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "1.120.000",
    sells: "400+",
  },
];

const shops = [
  {
    name: "Shop",
    image: avatar,
    rating: 2,
  },
  {
    name: "Shop name",
    image: avatar,
    rating: 4,
  },
  {
    name: "Shop name",
    image: avatar,
    rating: 3.5,
  },
];

const products = [
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "25",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "30",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "35",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "40",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "45",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "50",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "55",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "60",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "65",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "70",
  },
];
//Control Flash Sale Button
const PrevArrowFS = (props) => {
  const { onClick } = props;
  return (
    <div className={cx("controlfs-btn")} onClick={onClick}>
      <button className={cx("prev")}>
        <i className={cx("fa-regular fa-chevron-left")}></i>
      </button>
    </div>
  );
};
const NextArrowFS = (props) => {
  const { onClick } = props;
  return (
    <div className={cx("controlfs-btn")} onClick={onClick}>
      <button className={cx("next")}>
        <i className={cx("fa-solid fa-chevron-right")}></i>
      </button>
    </div>
  );
};
//Control Best Seller Button
const PrevArrowBS = (props) => {
  const { onClick } = props;
  return (
    <div className={cx("controlbs-btn")} onClick={onClick}>
      <button className={cx("prev")}>
        <i className={cx("fa-regular fa-chevron-left")}></i>
      </button>
    </div>
  );
};
const NextArrowBS = (props) => {
  const { onClick } = props;
  return (
    <div className={cx("controlbs-btn")} onClick={onClick}>
      <button className={cx("next")}>
        <i className={cx("fa-solid fa-chevron-right")}></i>
      </button>
    </div>
  );
};
const settings_flashsale = {
  infinite: true,
  speed: 1500,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 5000,
  nextArrow: <NextArrowFS />,
  prevArrow: <PrevArrowFS />,
};
const settings_bestseller = {
  infinite: true,
  speed: 1500,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 5000,
  nextArrow: <NextArrowBS />,
  prevArrow: <PrevArrowBS />,
};

function Home() {
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
  return (
    <>
      {/* -----------------HEADER----------------- */}
      <Header />

      <div className={cx("container")}>
        <div className={cx("content")}>
          {/* -----------------BANNER----------------- */}
          <Banner />
          {/* -----------------CATEGORIES----------------- */}
          <div className={cx("categories-container")}>
            <div className={cx("categories-heading")}>
              <i className={cx("cate-icon", "fa-solid fa-bars")}></i>
              <span className={cx("cate-text")}>Categories</span>
            </div>
            <div className={cx("categories")}>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={category.to}
                  className={cx("category-item")}
                >
                  <div className={cx("item-img")}>
                    <img src={category.image} alt="cate-img" />
                  </div>
                  <div className={cx("item-type")}>
                    <span className={cx("type-text")}>{category.title}</span>
                    <br></br>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* -----------------FLASH SALE----------------- */}
          <div className={cx("flashSale-container")}>
            <div className={cx("flashSale-top")}>
              <div className={cx("flashSale-heading")}>
                <span className={cx("flashSale-text-1")}>
                  F<i className={cx("fa-solid fa-bolt-lightning")}></i>
                  ASH <span className={cx("flashSale-text-2")}>SALE</span>
                </span>
                <span className={cx("countdown-minute")}>
                  {minute < 10 ? "0" + minute : minute}
                </span>
                <span className={cx("countdown-second")}>
                  {second < 10 ? "0" + second : second}
                </span>
              </div>
              <div className={cx("flashSale-more")}>
                <Link to="/flash_sale" className={cx("more-item")}>
                  <span className={cx("more-item-text")}>See more </span>
                  <i className={cx("fa-light fa-chevron-up fa-rotate-90")}></i>
                </Link>
              </div>
            </div>

            <div className={cx("flashSale-list")}>
              <Slider {...settings_flashsale}>
                {flashSales.map((item, index) => (
                  <Link
                    to="/flash_sale"
                    key={index}
                    className={cx("flashSale-items")}
                  >
                    <div className={cx("best-seller_item")}>
                      <div className={cx("item-img")}>
                        <img src={item.image} alt="item-img" />
                      </div>
                      <div className={cx("item-discount")}>
                        <span className={cx("per-discount")}>-20%</span>
                      </div>
                      <div className={cx("item-name")}>
                        {item.name}
                      </div>
                      <div className={cx("item-price")}>
                        <span className={cx("price")}>₫</span>
                        {item.price}
                      </div>
                      <div className={cx("item-status")}>
                        <div className={cx("loading")}>
                          <span className={cx("loading-text")}>
                            SELLING WELL
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>

          {/* -----------------BEST SELLER----------------- */}
          <div className={cx("best-seller_container")}>
            <div className={cx("best-seller_title")}>
              <p>TOP PRODUCTS</p>
            </div>
            <div className={cx("best-seller_list")}>
              <Slider {...settings_bestseller}>
                {bestSeller.map((item, index) => (
                  <div key={index} className={cx("best-seller_items")}>
                    <div className={cx("best-seller_item")}>
                      <div className={cx("best-seller_top")}>
                        <p>TOP</p>
                      </div>
                      <div className={cx("item-img")}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className={cx("bitem-name")}>{item.name}</div>
                      <div className={cx("item-price")}>{item.price}</div>
                      <div className={cx("item-sells")}>
                        <span>Monthly Sales {item.sells}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/* -----------------SHOP TRENDING----------------- */}
          <div className={cx("shop-trending-container")}>
            <div className={cx("shop-trending-top")}>
              <span>Shop Trending</span>
            </div>
            <div className={cx("shop-trending-content")}>
              {shops.map((shop, index) => (
                <div className={cx("shop-item")} key={index}>
                  <div className={cx("shop-img")}>
                    <img src={shop.image} alt="shop-img" />
                  </div>
                  <div className={cx("shop-text")}>
                    <div className={cx("head-text")}>
                      <h3>{shop.name}</h3>
                    </div>
                    <div className={cx("rating")}>
                      <span className={cx("rating-text")}>
                        <span className={cx("rate")}>{shop.rating}</span>/5
                      </span>
                      <div className={cx("rating-icon")}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={shop.rating}
                          precision={0.1}
                          size="medium"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className={cx("contact")}>
                      <button className={cx("chat")}>
                        <i
                          className={cx("fa-solid fa-messages", "icon-chat")}
                        ></i>
                        <span className={cx("chat-text")}>Chat</span>
                      </button>
                      <Link to="/" className={cx("view")}>
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
              ))}
            </div>
          </div>
          {/*-----------------------------------PRODUCTS------------------------------*/}
          <div className={cx("product_container")}>
            <div className={cx("product_title")}>DAILY PRODUCTS</div>
            <div className={cx("product_list")}>
              {products.map((item, index) => (
                <div key={index} className={cx("product_items")}>
                  <div className={cx("product-img")}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={cx("product-name")}>{item.name}</div>
                  <div className={cx("product-rating")}>
                    <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                    <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                    <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                    <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                    <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                  </div>
                  <div className={cx("price_before")}>${item.price}</div>
                  <div className={cx("product-price")}>${item.price}</div>
                  <button className={cx("btn_add")}>Buy Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Home;
