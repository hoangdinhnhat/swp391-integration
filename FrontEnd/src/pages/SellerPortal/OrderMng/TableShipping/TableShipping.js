import classNames from "classnames/bind";
import { useState } from "react";
import NoOrder from "../NoOrder";
import OrderDetails from "../OrderDetails";

import styles from "./Table.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

const statusStyle = (status) => {
  if (status === "COMPLETED") {
    return {
      backgroundColor: "#EBF9F4",
      color: "#39B588",
    };
  } else if (status === "CANCELED") {
    return {
      backgroundColor: "#FDF4F6",
      color: "#E36482",
    };
  } else if (status === "PENDING") {
    return {
      backgroundColor: "#FFF7E6",
      color: "#FFB619",
    };
  } else if (status === "SHIPPING") {
    return {
      backgroundColor: "#F2F4F8",
      color: "#1B4780",
    };
  }
};

function TableShipping({ orders, page, setPage, maxPage }) {
  const [openListDetail, setOpenListDetail] = useState(false);
  const [index, setIndex] = useState(0);

  if (!orders || orders.length === 0) {
    return <NoOrder />;
  }

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

  const handleApproveOrder = (e, orderId) => {
    e.preventDefault();
    axios
      .post("/api/v1/shop/order/confirm/" + orderId)
      .then((res) => {
        console.log(res);
        window.location.href = "/seller/portal/order/pending";
      })
      .catch((e) => console.log(e));
  };

  const handleRejectOrder = (e, orderId) => {
    e.preventDefault();
    axios
      .post("/api/v1/shop/order/reject/" + orderId)
      .then((res) => {
        console.log(res);
        window.location.href = "/seller/portal/order/pending";
      })
      .catch((e) => console.log(e));
  };

  const handleOpenDetails = (e, index) => {
    setOpenListDetail(true);
    setIndex(index);
  };

  return (
    <>
      {openListDetail && (
        <OrderDetails
          setOpenListDetail={setOpenListDetail}
          order={orders[index]}
        />
      )}
      <div className={cx("table_data")}>
        <div className={cx("table-head")}>
          <div className={cx("head-text", "orderId")}>Order ID</div>
          <div className={cx("head-text", "name")}>Order</div>
          <div className={cx("head-text", "date")}>Date</div>
          <div className={cx("head-text", "price")}>Price</div>
          <div className={cx("head-text", "status")}>Status</div>
          <div className={cx("head-text", "payment")}>Payment</div>
          <div className={cx("head-text", "edit")}>Action</div>
        </div>
        <div className={cx("table-content")}>
          {orders.map((item, index) => (
            <div className={cx("table-body")} key={index}>
              <div className={cx("body-text", "orderId")}>#{item.id}</div>
              <div className={cx("body-text", "name")}>
                <button
                  className={cx("show-list-order")}
                  onClick={(e) => handleOpenDetails(e, index)}
                >
                  List Order({item.orderDetails.length})
                </button>
              </div>
              <div className={cx("body-text", "date")}>
                {new Date(item.createdTime).toLocaleString()}
              </div>
              <div className={cx("body-text", "price")}>${item.sellPrice}</div>
              <div className={cx("body-text", "status")}>
                <div
                  className={cx("inside-status")}
                  style={statusStyle(item.status)}
                >
                  {item.status}
                </div>
              </div>
              <div className={cx("body-text", "payment")}>{item.payment}</div>
              <div className={cx("body-text", "edit")}>
                <button className={cx("approve-btn")}>
                  <i className={cx("fa-solid fa-check")}></i>
                </button>
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
    </>
  );
}

export default TableShipping;
