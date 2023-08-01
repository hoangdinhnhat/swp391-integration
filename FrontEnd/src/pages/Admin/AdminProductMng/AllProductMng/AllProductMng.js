import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AllProductMng.module.scss";
import DataTable from "react-data-table-component";
import Sidebar from "../../global/Sidebar";
import ProductMngNav from "../ProductMngNav/ProductMngNav";
import Topbar from "../../global/Topbar";
import axios from "axios";

const cx = classNames.bind(styles);

const productColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: 50,
    style: {
      fontsize: "16px",
    },
  },
  {
    name: "Image",
    cell: (row) => (
      <div>
        <img className={cx("product-img")} src={row.img} alt="product-img" />
      </div>
    ),
  },
  {
    name: "Product Name",
    selector: (row) => row.productName,
    sortable: true,
  },
  {
    name: "Shop Name",
    selector: (row) => row.shopName,
  },
  {
    name: "Category",
    selector: (row) => row.category,
  },
  {
    name: "Status",
    cell: (row) => (
      <div>
        {row.status === "Available" && (
          <p className={cx("available-status")}>Available</p>
        )}
        {row.status === "Banned" && (
          <p className={cx("banned-status")}>Banned</p>
        )}
      </div>
    ),
  },
  {
    name: "Action",
    cell: (row) => (
      <div>
        {row.status === "Available" && (
          <button
            className={cx("ban-btn")}
            onClick={() => {
              axios
                .post("/api/v1/admin/action/product/" + row.id + "?action=BAN")
                .then((res) => window.location.reload())
                .catch((e) => console.log(e));
            }}
          >
            Ban
          </button>
        )}
        {row.status === "Banned" && (
          <button
            className={cx("recover-btn")}
            onClick={() => {
              axios
                .post(
                  "/api/v1/admin/action/product/" + row.id + "?action=RECOVER"
                )
                .then((res) => window.location.reload())
                .catch((e) => console.log(e));
            }}
          >
            Recover
          </button>
        )}
      </div>
    ),
  },
];

const customStyles = {
  header: {
    style: {
      fontsize: "16px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f2f2f2",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#fff",
    },
  },
  cells: {
    style: {
      padding: "10px",
      fontSize: "15px",
    },
  },
};

function AllProductMng() {
  const [search, setSearch] = useState([]);
  const [records, setRecords] = useState([]);
  const handleaFilter = (event) => {
    const newData = records.filter((row) =>
      row.productName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearch(newData);
  };

  useEffect(() => {
    axios
      .get("/api/v1/admin/management/product")
      .then((res) => {
        let mappedProduct = res.data.map((item) => {
          let mapped = {
            id: item.id,
            img: item.images[0].url,
            productName: item.name,
            shopName: item.shop.name,
            category: item.category.name,
            status: item.ban ? "Banned" : "Available",
          };
          return mapped;
        });
        setRecords(mappedProduct);
        setSearch(mappedProduct);
      })
      .catch((e) => {
        console.log(e.response.status);
        if (e.response.status == 403) {
        }
      });
  }, []);

  return (
    <div className={cx("product-wrapper")}>
      <div className={cx("topbar")}>
        <Topbar />
      </div>
      <div className={cx("container")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("product-container")}>
          <div className={cx("nav-bar")}>
            <ProductMngNav />
          </div>
          <div className={cx("product-table")}>
            <div className={cx("input-search")}>
              <input
                type="text"
                placeholder="Search product"
                onChange={handleaFilter}
                className={cx("skw")}
              ></input>
            </div>

            <DataTable
              columns={productColumns}
              data={search}
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductMng;
