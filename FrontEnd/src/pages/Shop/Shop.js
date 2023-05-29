import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer/Footer";
import avatar from "~/assets/images/avatar.png";
import bird from "~/assets/images/bird-cage.png";

import styles from "./Shop.module.scss";
const cx = classNames.bind(styles);

const navBtns = ["all", "birds", "foods", "medicines", "cages", "accessories"];
const products = [
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "25",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "30",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "35",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "40",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "45",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "50",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "55",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "60",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "65",
    sold: "4.5",
  },
  {
    image: bird,
    name: "Best Choice Products 36in Indoor/Outdoor Iron Bird Cage for Medium Small Birds, Parrot, Lovebird, Finch, Parakeets, Cockatiel Enclosure w/Removable Tray, 4 Feeders, 2 Toys",
    price: "70",
    sold: "4.5",
  },
];

function Shop() {
  const [typeBtn, setTypeBtn] = useState("all");
  return (
    <>
      <Header />
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("shop_container")}>
            <div className={cx("shop-left_content")}>
              <div className={cx("shop_avatar")}>
                <img src={avatar} alt="avatar" />
              </div>
              <div className={cx("shop-info")}>
                <div className={cx("shop-name")}>Dirty Coins</div>
                <div className={cx("shop-active")}>
                  <span>Active 11 minutes ago</span>
                </div>
                <div className={cx("shop-interact")}>
                  <button className={cx("shop-chat")}>
                    <i className={cx("fa-solid fa-messages", "icon-chat")}></i>
                    <span>Chat</span>
                  </button>
                  <button className={cx("shop-follow")}>
                    <i className={cx("fa-regular fa-plus", "icon-follow")}></i>
                    <span>Follow</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("right-content")}>
              <div className={cx("shop-totalProducts")}>
                <i className={cx("fa-light fa-box", "icon")}></i>
                <span className={cx("name")}>Products: </span>
                <span className={cx("number")}> 125</span>
              </div>
              <div className={cx("shop-totalFollowers")}>
                <i className={cx("fa-light fa-user", "icon")}></i>
                <span className={cx("name")}>Followers: </span>
                <span className={cx("number")}> 100k</span>
              </div>
              <div className={cx("shop-totalRating")}>
                <i className={cx("fa-light fa-star", "icon")}></i>
                <span className={cx("name")}>Ratings: </span>
                <span className={cx("number")}> 4.9</span>
              </div>
              <div className={cx("shop-totalResponseRate")}>
                <i className={cx("fa-light fa-message-dots", "icon")}></i>
                <span className={cx("name")}>Response rate: </span>
                <span className={cx("number")}> 100%</span>
              </div>
            </div>
          </div>
          <div className={cx("shop_navbar")}>
            {navBtns.map((btn, index) => (
              <button
                className={
                  typeBtn === btn ? cx("nav-button-active") : cx("nav-button")
                }
                key={index}
                onClick={() => setTypeBtn(btn)}
              >
                {btn.toUpperCase()}
              </button>
            ))}
          </div>
          <div className={cx("shop-products")}>
            <div className={cx("rec-title")}>
              <span>RECOMMENDED FOR YOU</span>
            </div>
            <div className={cx("product-list")}>
              {products.map((item, index) => (
                <Link to="" key={index} className={cx("product_items")}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cx("product-img")}
                  />
                  <div className={cx("content")}>
                    <div className={cx("product-name")}>{item.name}</div>
                    <div className={cx("product-price")}>
                      <div className={cx("real-price")}>{item.price}$</div>
                      <span className={cx("sale-price")}>{item.price}$</span>
                    </div>
                    <div className={cx("rating_sold")}>
                      <div className={cx("rating")}>
                        <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                        <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                        <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                        <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                        <i className={cx("fa-solid fa-star", "rate_icon")}></i>
                      </div>
                      <div className={cx("sold")}>{item.sold}k sold</div>
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

export default Shop;
