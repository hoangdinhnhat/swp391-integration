import classNames from "classnames/bind";
import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import NavBar from "../NavBar";
import Table from "../Table";
import styles from "./Refund.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Refund() {
  const [orders, setOrders] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [number, setNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const searchRef = useRef();
  const [change, setChange] = useState(false);

  useEffect(() => {
    document.title = "Seller Centre";
  }, []);

  useEffect(() => {
    axios
      .get(
        "/api/v1/shop/orders/max-page?keyword=" + searchValue + "&filter=REFUND"
      )
      .then((res) => setMaxPage(res.data))
      .catch((e) => console.log(e));

    axios
      .get(
        "/api/v1/shop/orders/number?keyword=" + searchValue + "&filter=REFUND"
      )
      .then((res) => setNumber(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get(
        "/api/v1/shop/orders/search?filter=REFUND&page=" +
          page +
          "&keyword=" +
          searchValue
      )
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e));
  }, [page, searchValue, change]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchRef.current.value);
  };

  return (
    <>
      <HeaderSeller title="Refund" />
      <div className={cx("refund_wrapper")}>
        <div className={cx("refund_sidebar")}>
          <SideBar />
        </div>
        <div className={cx("refund_container")}>
          <div className={cx("refund-content")}>
            <NavBar />
            <div className={cx("order_search")}>
              <div className={cx("type-search")}>Code orders</div>
              <form className={cx("form-search")}>
                <div className={cx("search-input")}>
                  <input
                    type="text"
                    placeholder="Code"
                    spellCheck={false}
                    className={cx("input")}
                    // ref={searchRef}
                  />
                  <i
                    className={cx(
                      "fa-light fa-magnifying-glass",
                      "search-icon"
                    )}
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
            <div className={cx("order_count")}>{number} Orders</div>
            <div className={cx("order_table")}>
              <Table
                orders={orders}
                setPage={setPage}
                page={page}
                maxPage={maxPage}
                setChange={setChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Refund;
