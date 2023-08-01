import React from "react";
import classNames from "classnames/bind";
import styles from "./Topbar.module.scss";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import Notification from "./NotificationIcon";

const cx = classNames.bind(styles);

function Topbar() {
  return (
    <div className={cx("header")}>
      <div className={cx("header-content")}>
        <div className={cx("header-link")}>
          <Link to="/admin/portal/dashboard" className={cx("link")}>
            <p className={cx("text")}>
              <span className={cx("sub-text")}>B</span>ird
              <span className={cx("inner-subText")}>
                <span className={cx("sub-text")}>T</span>rading
              </span>
            </p>
            <div className={cx("otherText")}>Admin</div>
          </Link>
        </div>
        <div className={cx("header-info")}>
          <div className={cx("info-seller")}>
            <span className={cx("seller-name")}>Admin</span>
          </div>

          {/* <Notification /> */}
          <div className={cx("logout")}>
            <i className={cx("icon-logout", "fa-regular fa-power-off")}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
