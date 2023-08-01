import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import RateProduct from "./RateProduct";
import ReportProduct from "./ReportProduct";

import styles from "./SendFeedback.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function SendFeedback({ setOpenFeedback, order, setOrder }) {
  const [typeFeedback, setTypeFeedback] = useState("Rate Product");
  const [curProduct, setCurProduct] = useState({});

  const feedbackCondition = (order) => {
    return order.orderDetails.filter((od) => !od.feedbacked).length > 0;
  };

  useEffect(() => {
    if (!feedbackCondition(order)) {
      setOpenFeedback(false);
      return;
    }
    setCurProduct((prev) => {
      let orderDetails = order.orderDetails.find((od) => !od.feedbacked);
      let id = 1;
      if (orderDetails) {
        id = orderDetails.product.id;
      }
      return { ...prev, productId: id };
    });
  }, [order]);

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (curProduct.description) {
      let url = "/api/v1/users/order/feedbacks";
      var feedback = {
        orderId: order.id,
        productId: curProduct.productId,
        time: new Date(),
        rate: curProduct.rating,
        description: curProduct.description,
      };

      if (curProduct.type === "REPORT") {
        feedback = {
          orderId: order.id,
          productId: curProduct.productId,
          time: new Date(),
          reason: curProduct.reason,
          description: curProduct.description,
        };
        url = "/api/v1/users/order/reports";
      }

      const formData = new FormData();
      formData.append("video", curProduct.video);
      curProduct.images.forEach((img) => {
        formData.append("images", img);
      });

      formData.append("feedback", JSON.stringify(feedback));
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setOrder((prev) => {
            let od = prev.orderDetails.filter(
              (od) => od.product.id == curProduct.productId
            )[0];
            od.feedbacked = true;
            return { ...prev };
          });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("send-feedback-popup")}>
        <div className={cx("send-feedback_container")}>
          <div className={cx("send-feedback-options")}>
            <button
              className={cx("rate-product", {
                active: typeFeedback === "Rate Product",
              })}
              onClick={() => setTypeFeedback("Rate Product")}
            >
              Rate Product
            </button>
            {!order.reported && (
              <button
                className={cx("report-product", {
                  active: typeFeedback === "Report Product",
                })}
                onClick={() => setTypeFeedback("Report Product")}
              >
                Report Product
              </button>
            )}
          </div>
          {typeFeedback === "Rate Product" && (
            <RateProduct
              order={order}
              curProduct={curProduct}
              setCurProduct={setCurProduct}
            />
          )}
          {typeFeedback === "Report Product" && (
            <ReportProduct
              order={order}
              curProduct={curProduct}
              setCurProduct={setCurProduct}
            />
          )}
          <div className={cx("submit-feedback")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setOpenFeedback(false)}
            >
              Cancel
            </button>
            <button className={cx("send-btn")} onClick={handleSendFeedback}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendFeedback;
