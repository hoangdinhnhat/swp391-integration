import classNames from "classnames/bind";

import styles from "./OrderDetails.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

function OrderDetails({ setOpenListDetail, order, setChange }) {
  const navigate = useNavigate();

  const handleChat = (e, userId) => {
    e.preventDefault();
    navigate("/seller/portal/message", { state: userId });
  };

  const handleCompleteSpecialOrder = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/shop/order/special/delivery/" + order.id + "?action=CONFIRM")
      .then((res) => {
        setOpenListDetail(false)
        setChange(c => !c)
      })
      .catch((e) => console.log(e));
  };

  const handleInCompleteSpecialOrder = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/shop/order/special/delivery/" + order.id + "?action=REJECT")
      .then((res) => {
        setOpenListDetail(false)
        setChange(c => !c)
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("order-details-popup")}>
        <div className={cx("order-detail-header")}>
          <div className={cx("header")}>
            <div className={cx("title")}>Order</div>
            <div className={cx("orderId")}>#{order.id}</div>
          </div>
          <div className={cx("close")}>
            <button
              className={cx("close-btn")}
              onClick={() => setOpenListDetail(false)}
            >
              <i className={cx("fa-regular fa-xmark")}></i>
            </button>
          </div>
        </div>
        <div className={cx("order-detail-container")}>
          <div className={cx("user-information")}>
            <div className={cx("detail-user")}>
              <div className={cx("user-info")}>
                <div
                  className={cx("user-name")}
                >{`${order.user.firstname} ${order.user.lastname}`}</div>
                <div className={cx("phone-number")}>
                  {order.receiveInfo.phone}
                </div>
              </div>
              <div
                className={cx("contact-user")}
                onClick={(e) => handleChat(e, order.user.id)}
              >
                <button className={cx("chat-btn")}>Chat</button>
              </div>
            </div>
            <div className={cx("shipping-detail")}>
              <div className={cx("left")}>
                <div className={cx("shipping-to")}>Shipping to:</div>
                <div className={cx("shipping-address")}>
                  {`${order.receiveInfo.specific_address}, ${order.receiveInfo.ward.name}, ${order.receiveInfo.district.name}, ${order.receiveInfo.province.name}`}
                </div>
              </div>
              <div className={cx("shipping-fee")}>${order.shippingFee}</div>
            </div>
          </div>
          <div className={cx("order-detail_list")}>
            {order.orderDetails.map((od, odId) => (
              <div className={cx("order-detail")}>
                <img
                  src={od.product.images[0].url}
                  alt="img-detail"
                  className={cx("img-detail")}
                />
                <div className={cx("product-info")}>
                  <div className={cx("left")}>
                    <div className={cx("product-name")}>{od.product.name}</div>
                    <div className={cx("product-quantity")}>x{od.quantity}</div>
                  </div>
                  <div className={cx("right")}>
                    <div className={cx("price")}>${od.sellPrice}</div>
                  </div>
                </div>
              </div>
            ))}
            {order.special && order.status === "SHIPPING" && (
              <button onClick={handleCompleteSpecialOrder} className={cx("approve")}>
                Mark as complete delivery!
              </button>
            )}
            {order.special  && order.status === "SHIPPING" && (
              <button onClick={handleInCompleteSpecialOrder} className={cx("reject")}>
                Mark as incomplete delivery!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
