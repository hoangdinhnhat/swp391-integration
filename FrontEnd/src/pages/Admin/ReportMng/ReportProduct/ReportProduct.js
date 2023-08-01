import classNames from "classnames/bind";
import styles from "./ReportProduct.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function ReportProduct() {
  const [productReports, setProductReports] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/admin/management/report/product")
      .then((res) => {
        console.log(res.data);
        setProductReports(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleBanProduct = (e, pr) => {
    e.preventDefault();
    axios
      .post("/api/v1/admin/report/product/" + pr.id + "?action=BAN")
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  const handleWarningProduct = (e, pr) => {
    e.preventDefault();
    axios
      .post("/api/v1/admin/report/product/" + pr.id + "?action=WARNING")
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={cx("report-product")}>
      <div className={cx("report-header")}>
        <div className={cx("user")}>User</div>
        <div className={cx("shop")}>Shop</div>
        <div className={cx("product")}>Product</div>
        <div className={cx("type-reason")}>Type of Reason</div>
        <div className={cx("reason")}>Reason</div>
        <div className={cx("actions")}>Actions</div>
      </div>
      <div className={cx("report-list")}>
        {productReports.map((pr, prId) => (
          <div className={cx("report-item")} key={prId}>
            <div className={cx("rp-user")}>
              <img
                src={pr.reporter.imageurl}
                alt="avatar-user"
                className={cx("avatar-user")}
              />
              <div className={cx("user-name")}>
                {pr.reporter.firstname + " " + pr.reporter.lastname}
              </div>
            </div>
            <div className={cx("rp-shop")}>
              <div className={cx("text")}>{pr.product.shop.name}</div>
            </div>
            <div className={cx("rp-product")}>
              <img
                src={pr.product.images[0].url}
                alt="product-img"
                className={cx("product-img")}
              />
              <div className={cx("product-name")}>{pr.product.name}</div>
            </div>
            <div className={cx("rp-type-reason")}>
              <div className={cx("text")}>{pr.reasonType}</div>
            </div>
            <div className={cx("rp-reason")}>
              <div className={cx("text")}>{pr.reasonSpecific}</div>
            </div>
            <div className={cx("rp-actions")}>
              <button
                className={cx("ban-btn")}
                onClick={(e) => handleBanProduct(e, pr)}
              >
                <i className={cx("fa-regular fa-ban", "ban-icon")}></i>
              </button>
              <button
                className={cx("notify-btn")}
                onClick={(e) => handleWarningProduct(e, pr)}
              >
                <i
                  className={cx(
                    "fa-regular fa-triangle-exclamation",
                    "notify-icon"
                  )}
                ></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={cx("prev-next")}>
        <button className={cx("icon-left")}>
          <i className={cx("fa-light fa-angle-left")}></i>
        </button>
        <button className={cx("icon-right")}>
          <i className={cx("fa-light fa-angle-right")}></i>
        </button>
      </div>
    </div>
  );
}

export default ReportProduct;
