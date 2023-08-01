import classNames from "classnames/bind";
import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import NavBar from "../NavBar";
import TableEdit from "../TableEdit";

import styles from "./Pending.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Cancel() {
  const [orders, setOrders] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [number, setNumber] = useState(0)
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const searchRef = useRef();

  useEffect(() => {
    document.title = "Seller Centre";
  }, []);

  useEffect(() => {
    axios
      .get(
        "/api/v1/shop/orders/max-page?keyword=" +
          searchValue +
          "&filter=PENDING"
      )
      .then((res) => setMaxPage(res.data))
      .catch((e) => console.log(e));

    axios
      .get(
        "/api/v1/shop/orders/number?keyword=" +
          searchValue +
          "&filter=PENDING"
      )
      .then((res) => setNumber(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get(
        "/api/v1/shop/orders/search?filter=PENDING&page=" +
          page +
          "&keyword=" +
          searchValue
      )
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e));
  }, [page, searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchRef.current.value);
  };

  return (
    <>
      <HeaderSeller title="Pending" />
      <div className={cx("order_wrapper")}>
        <div className={cx("order_sidebar")}>
          <SideBar />
        </div>
        <div className={cx("order_container")}>
          <div className={cx("order_content")}>
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
                    ref={searchRef}
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
              <TableEdit
                orders={orders}
                setPage={setPage}
                page={page}
                maxPage={maxPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cancel;
