import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { Link, useNavigate } from "react-router-dom";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import NavBar from "./NavBar";
import HeaderFilter from "./HeaderFilter";
import Table from "./Table";
import { UserContext } from "~/userContext/Context";

import styles from "./Product.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

const items = [
  {
    title: "Name",
    children: {
      data: [
        {
          title: "A-Z",
          syntax: "a-z",
        },
        {
          title: "Z-A",
          syntax: "z-a",
        },
      ],
    },
  },
  {
    title: "Price",
    children: {
      data: [
        {
          title: "High to Low",
          syntax: "h-l",
        },
        {
          title: "Low to High",
          syntax: "l-h",
        },
      ],
    },
  },
  {
    title: "Quantity",
    children: {
      data: [
        {
          title: "Ascending",
          syntax: "asc",
        },
        {
          title: "Descending",
          syntax: "desc",
        },
      ],
    },
  },
];

function Product() {
  const UC = useContext(UserContext);
  const context = UC.state;
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  const [headerTitle, setHeaderTitle] = useState("");
  const [typeSort, setTypeSort] = useState("");
  const [filter, setFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("Filter");
  const [products, setProducts] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [shop, setShop] = useState({});
  const [change, setChange] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Seller Centre";
  }, []);

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
        setProducts(res.data.filter((item, index) => index < 5));
      })
      .catch((e) => console.log(e));
  }, [filter, page, change]);

  useEffect(() => {
    axios
      .get("/api/v1/shop/package/check")
      .then((res) => {
        if (!res.data) {
          navigate("/seller/portal/product/package");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (context && context.shopDTO) {
      setShop(context.shopDTO);
    }
  }, [context]);

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <div
          className={cx("option")}
          key={index}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
              setHeaderTitle(item.title);
            } else {
              setTypeSort(item.title);
              setFilter(item.syntax);
              setTitleFilter(item.title);
            }
          }}
        >
          {item.title}
        </div>
      );
    });
  };

  return (
    <>
      <HeaderSeller title="Product" />
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
            <div className={cx("product-manage")}>
              <div className={cx("product-count")}>
                {products.length >= 5 ? 15 : products.length} {15 > 1 ? "Products" : "Product"}
              </div>
              <div className={cx("product-options")}>
                <Tippy
                  interactive
                  delay={[0, 300]}
                  placement="bottom-end"
                  render={(attrs) => (
                    <div
                      className={cx("sort-options")}
                      tabIndex="-1"
                      {...attrs}
                    >
                      <PopperWrapper>
                        {history.length > 1 && (
                          <HeaderFilter
                            title={headerTitle}
                            onBack={() => {
                              setHistory((prev) =>
                                prev.slice(0, prev.length - 1)
                              );
                              setTitleFilter("Filter");
                            }}
                          />
                        )}
                        {renderItems()}
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <div className={cx("filter-product")}>
                    <span
                      className={
                        titleFilter === "Filter"
                          ? cx("sort-title")
                          : cx("sort-title-active")
                      }
                    >
                      {titleFilter}
                    </span>
                    <i
                      className={cx(
                        "fa-sharp fa-light fa-chevron-down",
                        "down-icon"
                      )}
                    ></i>
                  </div>
                </Tippy>
                {!shop.ban && (
                  <div className={cx("product-add")}>
                    <Link
                      to="/seller/portal/product/new"
                      className={cx("add-btn")}
                    >
                      <i
                        className={cx("fa-sharp fa-light fa-plus", "add-icon")}
                      ></i>
                      Add new product
                    </Link>
                  </div>
                )}
              </div>
            </div>
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

export default Product;
