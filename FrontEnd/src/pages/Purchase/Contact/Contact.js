import classNames from "classnames/bind";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import NavBar from "../NavBar";
import NoPurchase from "../NoPurchase/NoPurchase";

import styles from "./Contact.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Contact() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get("/api/v1/users/orders/search?filter=SPECIAL_USER&page=" + page)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleApprove = (e, order) => {
    e.preventDefault();
    axios
      .post(
        "/api/v1/users/order/special/process/" + order.id + "?action=CONFIRM"
      )
      .then((res) => {
        window.location.href = "/purchase/contact";
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Header />
      <div className={cx("cancelled_wrapper")}>
        <div className={cx("cancelled_container")}>
          <NavBar />
          {!orders || orders.length === 0 ? (
            <NoPurchase />
          ) : (
            orders.map((order, oIndex) => (
              <div className={cx("purchase_item")}>
                <div className={cx("purchase_item-info")}>
                  <div className={cx("purchase_item-header")}>
                    <div className={cx("shop-name")}>{order.shop.name}</div>
                    <div className={cx("status")}>SPECIAL</div>
                  </div>
                  {order.orderDetails.map((od, odIndex) => (
                    <div className={cx("purchase_item-detail")}>
                      <div className={cx("content")}>
                        <img
                          src={od.product.images[0].url}
                          alt="product-img"
                          className={cx("product-img")}
                        />
                        <div className={cx("product-content")}>
                          <div className={cx("product-name")}>
                            {od.product.name}
                          </div>
                          <div className={cx("quantity")}>x{od.quantity}</div>
                        </div>
                      </div>
                      <div className={cx("price")}>${od.sellPrice}</div>
                    </div>
                  ))}
                </div>
                <div className={cx("purchase_item_order-total")}>
                  <div className={cx("order-total-detail")}>
                    <div className={cx("text")}>Shipping Fee:</div>
                    <div className={cx("price")}>${order.shippingFee}</div>
                  </div>
                </div>
                <div className={cx("purchase_item_order-total")}>
                  <div className={cx("order-total-detail")}>
                    <div className={cx("text")}>Order Total:</div>
                    <div className={cx("price")}>
                      ${order.sellPrice + order.shippingFee}
                    </div>
                  </div>
                </div>
                <div className={cx("purchase_item-options")}>
                  <div className={cx("text")}>No rating received</div>
                  <div className={cx("button")}>
                    <button
                      className={cx("buy-btn")}
                      onClick={(e) => handleApprove(e, order)}
                    >
                      Confirm Order
                    </button>
                    <button className={cx("contact-btn")}>
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
