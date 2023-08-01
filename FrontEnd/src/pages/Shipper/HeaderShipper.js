import classNames from "classnames/bind";

import styles from "./Shipper.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function HeaderShipper() {
  const [shipper, setShipper] = useState({})

  useEffect(() => {
    axios.get("/api/v1/users/info")
    .then(res => {
      setShipper(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <div className={cx("header")}>
      <div className={cx("header-content")}>
        <div className={cx("header-link")}>
          <div className={cx("link")}>
            <p className={cx("text")}>
              <span className={cx("sub-text")}>B</span>ird
              <span className={cx("inner-subText")}>
                <span className={cx("sub-text")}>T</span>rading
              </span>
            </p>
            <div className={cx("otherText")}>Shipping Unit</div>
          </div>
        </div>
        <div className={cx("header-info")}>
          <div className={cx("info-seller")}>
            <img className={cx("avatar")} src={shipper.imageurl} alt="avatar"/>
            <div className={cx("seller-name")}>{shipper.firstname}</div>
          </div>
          <div className={cx("logout")}>
            <i className={cx("icon-logout", "fa-regular fa-power-off")}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderShipper;
