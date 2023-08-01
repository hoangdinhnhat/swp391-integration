import classNames from "classnames/bind";

import OrderPopup from "./OrderPopup";
import styles from "./Shipper.module.scss";

import HeaderShipper from "./HeaderShipper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Shipper() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openOrder, setOpenOrder] = useState();
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    document.title = "Shipping Unit";
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/shipper/max-page?keyword=" + search)
      .then((res) => setMaxPage(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/shipper/orders?page=" + page + "&keyword=" + search)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log(e));
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchRef.current.value);
  };

  const handleOpenPopup = (order) => {
    setOpenPopup(true);
    setOpenOrder(order);
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

  const handleSuccessDelivery = (e, order) => {
    e.stopPropagation();
    axios
      .post(
        "/api/v1/shipper/order/special/process/" + order.id + "?action=CONFIRM"
      )
      .then((res) => {
        axios
          .get("/api/v1/shipper/orders?page=" + page)
          .then((res) => {
            setOrders(res.data);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const handleUnSuccessDelivery = (e, order) => {
    e.stopPropagation();
    axios
      .post(
        "/api/v1/shipper/order/special/process/" + order.id + "?action=REJECT"
      )
      .then((res) => {
        axios
          .get("/api/v1/shipper/orders?page=" + page)
          .then((res) => {
            setOrders(res.data);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <>
      {openPopup && <OrderPopup closePopup={setOpenPopup} order={openOrder} />}
      <HeaderShipper />
      <div className={cx("shipper_container")}>
        <div className={cx("shipper_content")}>
          <div className={cx("order_search")}>
            <div className={cx("type-search")}>Order code</div>
            <form className={cx("form-search")}>
              <div className={cx("search-input")}>
                <input
                  type="text"
                  placeholder="Code"
                  spellCheck={false}
                  className={cx("input")}
                  ref={searchRef}
                />
                <i
                  className={cx("fa-light fa-magnifying-glass", "search-icon")}
                ></i>
              </div>
              <button
                type="submit"
                className={cx("search-btn")}
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div>
          {orders.map((order) => (
            <div className={cx("order_result")} key={order.id}>
              <div
                className={cx("result")}
                onClick={() => handleOpenPopup(order)}
              >
                <div className={cx("order-code")}>#{order.id} - Shipping Fee: ${order.shippingFee} - Collection Fee: ${roundedFloat(order.soldPrice + order.shippingFee)}</div>
                <div className={cx("order-detail")}>
                  <div className={cx("product-detail")}>
                    <img
                      src={order.orderDetails[0].product.images[0].url}
                      alt="product-img"
                      className={cx("product-img")}
                    />
                    <div className={cx("product-info")}>
                      <div className={cx("name")}>
                        {order.orderDetails[0].product.name}
                      </div>
                      <div className={cx("quantity")}>
                        x{order.orderDetails[0].quantity}
                      </div>
                      <div className={cx("price")}>
                        {roundedFloat(order.orderDetails[0].soldPrice)}$
                      </div>
                    </div>
                  </div>
                  <div className={cx("user-detail")}>
                    <div className={cx("user-info")}>
                      <div
                        className={cx("username")}
                      >{`${order.user.firstname} ${order.user.lastname}`}</div>
                      <div className={cx("phone")}>
                        {order.receiveInfo.phone}
                      </div>
                      <div className={cx("address")}>
                        {`${order.receiveInfo.specific_address}, ${order.receiveInfo.ward.name}, ${order.receiveInfo.district.name}, ${order.receiveInfo.province.name}`}
                      </div>
                    </div>
                  </div>
                  <div className={cx("action")}>
                    <div className={cx("action-btn")}>
                      <div className={cx("approve")}>
                        <button
                          className={cx("approve-btn")}
                          onClick={(e) => handleSuccessDelivery(e, order)}
                        >
                          Successful delivery
                        </button>
                      </div>
                      <div className={cx("reject")}>
                        <button
                          className={cx("reject-btn")}
                          onClick={(e) => handleUnSuccessDelivery(e, order)}
                        >
                          Unsuccessful delivery
                        </button>
                      </div>
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
    </>
  );
}

export default Shipper;
