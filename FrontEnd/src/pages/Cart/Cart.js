// import React from 'react'
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import { UserContext } from "~/userContext/Context";
import styles from "./Cart.module.scss";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";

import { Cartcontext } from "~/context/Context";
import axios from "axios";

const cx = classNames.bind(styles);

function Cart() {
  const paramLocation = useLocation();
  const context = useContext(UserContext);
  const user = context.state;
  const [total, setTotal] = useState(0);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (paramLocation.state) {
      console.log(paramLocation);
      setCheckedProducts((prev) => [...prev, ...paramLocation.state]);
    }
  }, [paramLocation]);

  useEffect(() => {
    document.title = `Shopping Cart`;
    axios
      .get("/api/v1/users/cart")
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOAD",
          payload: res.data,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    state.forEach((i) => {
      totalQuantity += i.cartProducts.length;
      let products = i.cartProducts.filter(
        (it) => checkedProducts.indexOf(it.product.id) !== -1
      );
      totalPrice += products.reduce((total, item) => {
        let price = item.product.price;
        if (item.salePercent && item.saleQuantity > item.saleSold) {
          price = price - (price * item.salePercent) / 100;
        }
        return total + price * item.quantity;
      }, 0);
    });
    console.log(totalPrice);
    setTotal({
      totalPrice: roundedFloat(totalPrice),
      totalQuantity: totalQuantity,
    });
  }, [checkedProducts, state]);

  const handleCheckout = () => {
    let item = state.filter((item, index) => {
      return (
        item.cartProducts.filter(
          (cp, i) => checkedProducts.indexOf(cp.product.id) !== -1
        ).length > 0
      );
    });
    item = item.map((item, index) => {
      let filtered = item.cartProducts.filter(
        (cp, i) => checkedProducts.indexOf(cp.product.id) !== -1
      );

      return { ...item, cartProducts: filtered };
    });
    console.log(item);

    navigate("/checkout", {
      state: {
        item: item,
        total: total.totalPrice,
      },
    });
  };

  const handleCheckShop = (e, item) => {
    let products = item.cartProducts
      .filter((cp) => cp.product.available >= cp.quantity)
      .map((cp) => cp.product.id);
    let checked = checkedProducts.every((cp) => products.indexOf(cp) === -1);
    if (checked) {
      setCheckedProducts((prev) => [...prev, ...products]);
      return;
    }

    if (shopCheckedCondition(item)) {
      let filter = checkedProducts.filter((cp) => products.indexOf(cp) === -1);
      setCheckedProducts(filter);
      return;
    }

    let filter = products.filter((cp) => checkedProducts.indexOf(cp) === -1);
    setCheckedProducts((prev) => [...prev, ...filter]);
  };

  const handleCheckProduct = (e, item, product) => {
    let isChecked = checkedProducts.indexOf(product.id) !== -1;
    if (isChecked) {
      let filter = checkedProducts.filter((p) => p !== product.id);
      setCheckedProducts(filter);
      return;
    }

    if (product.available >= item.quantity) {
      setCheckedProducts((prev) => [...prev, product.id]);
    }
  };

  const handleCheckAll = () => {
    let allProducts = [];
    state.forEach((item, index) => {
      let products = item.cartProducts
        .filter((cp) => cp.product.available >= cp.quantity)
        .map((cp) => cp.product.id);
      allProducts = [...allProducts, ...products];
    });

    let isCheckedAll = allProducts.every(
      (cp) => checkedProducts.indexOf(cp) !== -1
    );

    if (isCheckedAll) {
      setCheckedProducts([]);
      return;
    }

    let remainingProducts = allProducts.filter(
      (p) => checkedProducts.indexOf(p) === -1
    );
    console.log(remainingProducts);
    setCheckedProducts((prev) => [...prev, ...remainingProducts]);
  };

  const shopCheckedCondition = (item) => {
    let products = item.cartProducts.map((cp) => cp.product.id);
    let checked = products.every((cp) => checkedProducts.indexOf(cp) !== -1);
    return checked;
  };

  const allCheckedCondition = () => {
    let allProducts = [];
    state.forEach((item, index) => {
      let products = item.cartProducts.map((cp) => cp.product.id);
      allProducts = [...allProducts, ...products];
    });
    let checked = allProducts.every((cp) => checkedProducts.indexOf(cp) !== -1);
    return checked;
  };

  return (
    <>
      <Header />
      {user ? (
        <div className={cx("container")}>
          {state.length < 1 ? (
            <div className={cx("no-item")}>
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png?fbclid=IwAR3K0JTocd1P-MQ_umPdQcejgKPwax5CiCtEwDSy6Y4HnJveEwVYnu6ROho"
                alt="No item"
              ></img>
              <p>Your shopping cart is empty</p>
              <Link to="/" className={cx("goback-link")}>
                Go Shopping Now
              </Link>
            </div>
          ) : (
            <>
              <div className={cx("cart-container")}>
                <div className={cx("cart-header")}>
                  <div className={cx("item-pick")}>
                    <input
                      type="checkbox"
                      // value={products}
                      className={cx("checkbox-all")}
                      style={{ opacity: 0 }}
                    />
                    <span>Product</span>
                  </div>
                  <div className={cx("item-details")}>Unit Price</div>
                  <div className={cx("item-details")}>Quantity</div>
                  <div className={cx("item-details")}>Total Price</div>
                  <div className={cx("item-details")}>Actions</div>
                </div>
                {state.map((item, index) => (
                  <div key={index} className={cx("shop-cart")}>
                    <div className={cx("shop_checkbox")}>
                      <input
                        type="checkbox"
                        // value={shop}
                        className={cx("checkbox-shop")}
                        checked={shopCheckedCondition(item)}
                        onChange={(e) => handleCheckShop(e, item)}
                      />
                      <span>{item.shop.name}</span>
                    </div>
                    <div className={cx("product_cart")}>
                      {item.cartProducts.map((p, i) => {
                        return (
                          <div
                            key={i}
                            className={cx("product-item")}
                            style={
                              p.product.available < p.quantity
                                ? { opacity: "0.4" }
                                : {}
                            }
                          >
                            <div className={cx("product_pick")}>
                              <input
                                type="checkbox"
                                checked={
                                  checkedProducts.indexOf(p.product.id) !== -1
                                }
                                onChange={(e) =>
                                  handleCheckProduct(e, p, p.product)
                                }
                                className={cx("checkbox-product")}
                              />
                              <img
                                src={p.product.images[0].url}
                                alt="Product name"
                              />
                              <span>{p.product.name}</span>
                            </div>
                            <div className={cx("product-details")}>
                              $
                              {p.salePercent
                                ? roundedFloat(
                                    p.product.price * (1 - p.salePercent / 100)
                                  )
                                : p.product.price}
                            </div>
                            <div className={cx("product-quantity")}>
                              <button
                                className={cx("product-input")}
                                onClick={() => {
                                  if (p.quantity - 1 >= 1) {
                                    dispatch({
                                      type: "DECREASE",
                                      payload: p.product.id,
                                      setMsg: setMsg,
                                    });
                                  } else {
                                    dispatch({
                                      type: "REMOVE",
                                      payload: p.product.id,
                                      setMsg: setMsg,
                                    });
                                  }
                                }}
                              >
                                -
                              </button>
                              <p>{p.quantity}</p>
                              <button
                                className={cx("product-input")}
                                onClick={() => {
                                  if (p.product.available <= p.quantity) {
                                    setMsg(
                                      "Product " +
                                        p.product.name +
                                        " isn't enough for increase"
                                    );
                                  } else {
                                    dispatch({
                                      type: "INCREASE",
                                      payload: p.product.id,
                                    });
                                  }
                                }}
                              >
                                +
                              </button>
                            </div>
                            <div className={cx("product-details")}>
                              $
                              {(p.salePercent
                                ? roundedFloat(
                                    p.product.price * (1 - p.salePercent / 100)
                                  )
                                : p.product.price) * p.quantity}
                            </div>
                            <div className={cx("product-details")}>
                              <i
                                className={cx("fa-solid fa-trash-can")}
                                onClick={() =>
                                  dispatch({
                                    type: "REMOVE",
                                    payload: p.product.id,
                                  })
                                }
                              ></i>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className={cx("notify-error")}>
                  {msg && (
                    <Alert key="danger" variant="danger">
                      {msg}
                    </Alert>
                  )}
                </div>
              </div>

              <div className={cx("bottom")}>
                <div className={cx("cart-left")}>
                  <div className={cx("selectAll")}>
                    <input
                      type="checkbox"
                      checked={allCheckedCondition()}
                      // value={products}
                      onChange={() => handleCheckAll()}
                    />
                    <p>Select All ({total.totalQuantity})</p>
                  </div>
                  <div className={cx("deleteAll")}>
                    <p>Delete</p>
                  </div>
                </div>
                <div className={cx("cart-right")}>
                  <div className={cx("totalPrice")}>
                    <span className={cx("sub-name")}>Total:</span>
                    <span className={cx("sub-price")}>${total.totalPrice}</span>
                  </div>
                  <button
                    disabled={total.totalPrice < 1}
                    onClick={handleCheckout}
                    className={cx("checkout-btn")}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
      <Footer />
    </>
  );
}

export default Cart;
