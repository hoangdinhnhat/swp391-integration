import classNames from "classnames/bind";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import NavBar from "../NavBar";
import Table from "../Table";
import CountFilter from "../CountFilter";

import styles from "./SoldOut.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function SoldOut() {
  const [products, setProducts] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios
      .get("/api/v1/shop/products/max-page")
      .then((res) => setMaxPage(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    let fil = headerTitle.toLowerCase()
      ? headerTitle.toLowerCase() + "." + filter
      : "default";
    axios
      .get("/api/v1/shop/products?page=" + page + "&filter=" + fil)
      .then((res) => {
        let resProducts = res.data.filter(
          (item, index) => item.available === 0
        );
        setProducts(resProducts.filter((item, index) => index < 5));
      })
      .catch((e) => console.log(e));
  }, [filter, page, change]);

  useEffect(() => {
    document.title = "Seller Centre";
  }, []);

  return (
    <>
      <HeaderSeller title="Product Sold Out" />
      <div className={cx("product_wrapper")}>
        <div className={cx("product_sidebar")}>
          <SideBar />
        </div>
        <div className={cx("product_container")}>
          <div className={cx("product_content")}>
            <NavBar />
            <div className={cx("product-search")}>
              <div className={cx("product-type")}>Product name</div>
              <form className={cx("form-search")}>
                <div className={cx("search-input")}>
                  <input
                    type="text"
                    placeholder="Product name"
                    spellCheck={false}
                    className={cx("input")}
                  />
                  <i
                    className={cx(
                      "fa-light fa-magnifying-glass",
                      "search-icon"
                    )}
                  ></i>
                </div>
                <button type="submit" className={cx("search-btn")}>
                  Search
                </button>
              </form>
            </div>
            <CountFilter
              count={products.length}
              setFilter={setFilter}
              headerTitle={headerTitle}
              setHeaderTitle={setHeaderTitle}
            />
            <div className={cx("product-table")}>
              <Table
                products={products}
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

export default SoldOut;
