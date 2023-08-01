import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./CheckoutPopup.module.scss";

const cx = classNames.bind(styles);

function CheckoutPopup({ type, msg }) {
  return type == "success" ? (
    <div className={cx("overlay")}>
      <div className={cx("checkout-popup")}>
        <div className={cx("checkout-content")}>
          <div className={cx("header")}>
            <i className={cx("fa-solid fa-check", "check-icon")}></i>
            <span className={cx("title")}>Order Success</span>
          </div>
          <div className={cx("content")}>
            Please select purchase order to see more information
          </div>
          <div className={cx("options")}>
            <a href="/" className={cx("home")}>
              Home
            </a>
            <a href="/purchase/pending" className={cx("order")}>
              Purchase Order
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={cx("overlay")}>
      <div className={cx("checkout-popup")}>
        <div className={cx("checkout-content")}>
          <div className={cx("header")}>
            <i className={cx("fa-sharp fa-regular fa-xmark", "check-icon")}></i>
            <span className={cx("title")}>Order UnSuccess</span>
          </div>
          <div className={cx("content")}>
            {msg}
          </div>
          <div className={cx("options")}>
            <a href="/" className={cx("home")}>
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPopup;
