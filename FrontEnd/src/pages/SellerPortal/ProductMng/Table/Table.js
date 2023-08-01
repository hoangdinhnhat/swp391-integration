import classNames from "classnames/bind";

import NoProduct from "../NoProduct";
import styles from "./Table.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import EditProduct from "../EditProduct/EditProduct";

const cx = classNames.bind(styles);

const statusStyle = (status) => {
  if (status === "Active") {
    return {
      backgroundColor: "#EBF9F4",
      color: "#39B588",
    };
  } else if (status === "Ban") {
    return {
      backgroundColor: "#FDF4F6",
      color: "#E36482",
    };
  } else if (status === "Sold out") {
    return {
      backgroundColor: "#FFF7E6",
      color: "#FFB619",
    };
  }
};

function Table({ products, page, setPage, maxPage, setChange }) {
  const [showEdit, setShowEdit] = useState(false)
  const [productEdit, setProductEdit] = useState()

  if (!products || products.length === 0) {
    return <NoProduct />;
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

  const handleDeleteProduct = (e, product) => {
    e.preventDefault();
    axios
      .delete("/api/v1/shop/products/delete?id=" + product.id)
      .then((res) => {
        alert(res.data);
        setChange(c => !c)
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateProduct = (e, product) => {
    e.preventDefault();
    setProductEdit(product)
    setShowEdit(true)
  };

  return (
    <div className={cx("table_data")}>
      {showEdit && <EditProduct product={productEdit} setShowEdit={setShowEdit} setChange={setChange}/>}
      <div className={cx("table-head")}>
        <div className={cx("head-product")}>Product</div>
        <div className={cx("head-price")}>Price</div>
        <div className={cx("head-quantity")}>Quantity</div>
        <div className={cx("head-status")}>Status</div>
        <div className={cx("head-edit")}>Edit</div>
        <div className={cx("head-delete")}>Delete</div>
      </div>
      <div className={cx("table-content")}>
        {products.map((product) => {
          let status = "Active";
          if (product.ban) status = "Ban";
          if (product.available === 0) status = "Sold out";

          return (
            <div className={cx("table-body")} key={product.id}>
              <div className={cx("body-text", "body-product")}>
                <img
                  src={product.images[0].url}
                  alt="product-img"
                  className={cx("product-img")}
                />
                <div className={cx("product-name")}>{product.name}</div>
              </div>
              <div className={cx("body-text", "body-price")}>
                ${product.price}
              </div>
              <div className={cx("body-text", "body-quantity")}>
                {product.available}
              </div>
              <div className={cx("body-text", "body-status")}>
                <div
                  className={cx("inside-status")}
                  style={statusStyle(status)}
                >
                  {status}
                </div>
              </div>
              <div className={cx("body-text", "body-edit")}>
                <button
                  className={cx("edit-btn")}
                  onClick={(e) => handleUpdateProduct(e, product)}
                >
                  <i
                    className={cx("fa-regular fa-pen-to-square", "edit-icon")}
                  ></i>
                </button>
              </div>
              <div className={cx("body-text", "body-delete")}>
                <button
                  className={cx("delete-btn")}
                  onClick={(e) => handleDeleteProduct(e, product)}
                >
                  <i className={cx("fa-regular fa-trash", "delete-icon")}></i>
                </button>
              </div>
            </div>
          );
        })}
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
  );
}

export default Table;
