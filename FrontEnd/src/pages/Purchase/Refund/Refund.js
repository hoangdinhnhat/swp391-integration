import classNames from "classnames/bind";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import NavBar from "../NavBar";
import NoPurchase from "../NoPurchase";
import RefundDetail from "./RefundDetail";
import styles from "./Refund.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Refund() {
  const [openPopup, setOpenPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [orderShow, setOrderShow] = useState()

  const handleOpenPopup = (order) => {
    setOpenPopup(true);
    setOrderShow(order)
  };

  useEffect(() => {
    axios
      .get("/api/v1/users/orders/search?filter=REFUND&page=" + page)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e));
  }, []);

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <>
      {openPopup && <RefundDetail closePopup={setOpenPopup} order={orderShow} />}
      <Header />
      <div className={cx("refund_wrapper")}>
        <div className={cx("refund_container")}>
          <NavBar />
          {!orders || orders.length === 0 ? (
            <NoPurchase />
          ) : (
            orders.map((order, index) => (
              <div className={cx("purchase_item")} key={index}>
                <div className={cx("purchase_item-info")}>
                  <div className={cx("purchase_item-header")}>
                    <div className={cx("shop-name")}>{order.shop.name}</div>
                    <div className={cx("status")}>REFUND</div>
                  </div>
                  <div
                    className={cx("purchase_item-detail")}
                    onClick={() => handleOpenPopup(order)}
                  >
                    <div className={cx("content")}>
                      <img
                        src={order.orderDetails[0].product.images[0].url}
                        alt="product-img"
                        className={cx("product-img")}
                      />
                      <div className={cx("product-content")}>
                        <div className={cx("product-name")}>
                          {order.orderDetails[0].product.name}
                        </div>
                        <div className={cx("quantity")}>
                          x{order.orderDetails[0].quantity}
                        </div>
                      </div>
                    </div>
                    <div className={cx("price")}>
                      ${roundedFloat(order.orderDetails[0].soldPrice)}
                    </div>
                  </div>
                </div>
                <div className={cx("purchase_item_order-total")}>
                  <div className={cx("order-total-detail")}>
                    <div className={cx("text")}>Order Total:</div>
                    <div className={cx("price")}>${roundedFloat(order.soldPrice + order.shippingFee)}</div>
                  </div>
                </div>
                <div className={cx("purchase_item-options")}>
                  <div className={cx("text")}>No rating received</div>
                  <div className={cx("button")}>
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

export default Refund;
