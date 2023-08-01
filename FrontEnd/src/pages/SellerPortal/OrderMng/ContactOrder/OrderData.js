import classNames from "classnames/bind";
import NoOrder from "../NoOrder";

import styles from "./ContactOrder.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function OrderData({ orders, page, setPage, maxPage }) {
  const [shippingFee, setShippingFee] = useState("");
  const navigate = useNavigate()

  const handleApprove = (e, order) => {
    e.preventDefault();
    axios
      .post(
        "/api/v1/shop/order/special/process/" +
          order.id +
          "?shippingFee=" +
          shippingFee +
          "&action=" +
          "CONFIRM"
      )
      .then((res) => {
        window.location.href = "/seller/portal/order/contact";
      })
      .catch((e) => console.log(e));
  };

  const handleReject = (e, order) => {
    e.preventDefault();
    axios
      .post(
        "/api/v1/shop/order/special/process/" +
          order.id +
          "?shippingFee=" +
          shippingFee +
          "&action=" +
          "REJECT"
      )
      .then((res) => {
        window.location.href = "/seller/portal/order/contact";
      })
      .catch((e) => console.log(e));
  };

  const handlePrevPage = () => {
    let willBe = page - 1;
    if (willBe <= 0) {
      return;
    }
    setPage(page - 1);
  };

  const handleNextPage = () => {
    let willBe = page + 1;
    if (willBe > maxPage) {
      return;
    }
    setPage(page + 1);
  };

  const handleChat = (e, userId) =>
  {
    e.preventDefault()
    navigate("/seller/portal/message", {state: userId})
  }

  if (!orders || orders.length === 0) {
    return <NoOrder />;
  }
  return (
    <div className={cx("order_list")}>
      <div className={cx("order-head")}>Order Information</div>
      <div className={cx("order-content")}>
        {orders.map((order, index) => (
          <div className={cx("order-detail")} key={index}>
            <div className={cx("user-information")}>
              <div className={cx("user-detail")}>
                <img
                  src={order.user.imageurl}
                  alt="user-avatar"
                  className={cx("user-avatar")}
                />
                <div className={cx("user-right")}>
                  <div
                    className={cx("name")}
                  >{`${order.user.firstname} ${order.user.lastname}`}</div>
                  <div className={cx("chat")}>
                    <button className={cx("chat-btn")} onClick={e => handleChat(e, order.user.id)}>
                      <i
                        className={cx("fa-solid fa-messages", "icon-chat")}
                      ></i>
                      <span className={cx("chat-text")}>Chat</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className={cx("product-main")}>
                <div className={cx("orderID")}>#{order.id}</div>
                <div className={cx("orderDate")}>
                  {new Date(order.createdTime).toLocaleString()}
                </div>
              </div>
            </div>
            <div className={cx("product-information")}>
              {order.orderDetails.map((od, odIndex) => (
                <div className={cx("product-detail")}>
                  <img
                    src={od.product.images[0].url}
                    alt="product-img"
                    className={cx("product-img")}
                  />
                  <div className={cx("product-content")}>
                    <div className={cx("name")}>{od.product.name}</div>
                    <div className={cx("price")}>${od.sellPrice}</div>
                    <div className={cx("quantity")}>x{od.quantity}</div>
                  </div>
                </div>
              ))}
              <div className={cx("product-edit")}>
                <div className={cx("shipping-fee")}>
                  <input
                    type="number"
                    className={cx("input-fee")}
                    placeholder="Shipping fee"
                    value={shippingFee}
                    onChange={(e) => setShippingFee(e.target.value)}
                  />
                </div>
                <div className={cx("buttons")}>
                  <div className={cx("approve")}>
                    <button
                      className={cx("approve-btn")}
                      onClick={(e) => handleApprove(e, order)}
                    >
                      <i className={cx("fa-solid fa-check")}></i>
                      <span className={cx("text")}>Approve</span>
                    </button>
                  </div>
                  <div className={cx("reject")}>
                    <button
                      className={cx("reject-btn")}
                      onClick={(e) => handleReject(e, order)}
                    >
                      <i className={cx("fa-solid fa-xmark")}></i>
                      <span className={cx("text")}>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={cx("prev-next")}>
          <button
            className={cx("icon-left")}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <i className={cx("fa-light fa-angle-left")}></i>
          </button>
          <button
            className={cx("icon-right")}
            onClick={handleNextPage}
            disabled={page === maxPage}
          >
            <i className={cx("fa-light fa-angle-right")}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderData;
