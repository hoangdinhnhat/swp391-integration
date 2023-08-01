import classNames from "classnames/bind";

import styles from "./OrderDetail.module.scss";

const cx = classNames.bind(styles);

function OrderDetail({ closePopup, order }) {
  return (
    <>
      <div className={cx("overlay")}>
        <div className={cx("order_popup")}>
          <div className={cx("order_container")}>
            <div className={cx("order_header")}>
              <div className={cx("order-id")}>#{order.id} - SHIPPING FEE: ${order.shippingFee} - TOTAL: ${order.soldPrice + order.shippingFee}</div>
              <div className={cx("close")}>
                <i
                  className={cx("fa-solid fa-xmark")}
                  onClick={() => closePopup(false)}
                ></i>
              </div>
            </div>
            <div className={cx("order_content")}>
              {order.orderDetails.map((OD, index) => (
              <div className={cx("item")}>
                <img
                  src={OD.product.images[0].url}
                  alt="product-img"
                  className={cx("product-img")}
                />
                <div className={cx("info")}>
                  <div className={cx("left")}>
                    <div className={cx("name")}>
                      {OD.product.name}
                    </div>
                    <div className={cx("quantity")}>x{OD.quantity}</div>
                  </div>
                  <div className={cx("price")}>${OD.soldPrice}</div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
