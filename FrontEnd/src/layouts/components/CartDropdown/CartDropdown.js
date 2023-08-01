import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./CartDropdown.module.scss";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { Cartcontext } from "~/context/Context";

const cx = classNames.bind(styles);

function CartDropdown() {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const [cartSize, setCartSize] = useState(0);
  const [lastFiveItems, setLastFiveItems] = useState([]);

  useEffect(() => {
    let size = 0;
    let count = 0;
    let fiveItems = [];
    state.forEach((ci) => {
      size += ci.cartProducts.length;
      ci.cartProducts.forEach((p) => {
        if (count <= 4) {
          fiveItems.push(p);
          count++;
        }
      });
    });
    console.log(fiveItems);
    setCartSize(size);
    setLastFiveItems(fiveItems);
  }, [state]);

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <div className={cx("cart-icon")}>
      {cartSize > 0 && (
        <span className={cx("counter", "disable")}>{cartSize}</span>
      )}
      <Link to="/cart" className={cx("cart-link")}>
        <div className={cx("dropdown-cart")}>
          <Tippy
            interactive
            delay={[0, 200]}
            placement="bottom"
            render={(attrs) => (
              <div className={cx("product-items")} tabIndex="-1" {...attrs}>
                {state.length < 1 ? (
                  <div className={cx("no-item")}>
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png?fbclid=IwAR3K0JTocd1P-MQ_umPdQcejgKPwax5CiCtEwDSy6Y4HnJveEwVYnu6ROho"
                      alt="No item"
                    ></img>
                    <p>No item added!</p>
                  </div>
                ) : (
                  <PopperWrapper className={cx("dropdown_container")}>
                    <p className={cx("drop-title")}>Recently Added Products</p>
                    <div className={cx("product-item")}>
                      {lastFiveItems.map((cartItems) => (
                        <Link
                          key={cartItems.product.id}
                          to={"/product?productId=" + cartItems.product.id}
                          className={cx("product-link")}
                        >
                          <div className={cx("prod-img")}>
                            <img
                              src={cartItems.product.images[0].url}
                              alt="Product"
                            />
                          </div>
                          <div className={cx("prod-name")}>
                            <p className={cx("type-text")}>
                              {cartItems.product.name}
                            </p>
                          </div>
                          <div className={cx("prod-price")}>
                            <p className={cx("type-text")}>
                              {roundedFloat(
                                cartItems.product.price *
                                  (1 - cartItems.salePercent / 100)
                              )}
                              $
                            </p>
                          </div>
                        </Link>
                      ))}
                      <Link to="/product" className={cx("product-link")}></Link>
                    </div>
                    <div className={cx("bottom-item")}>
                      <p>
                        {cartSize - lastFiveItems.length} more products in cart
                      </p>
                      <button>View Shopping Cart</button>
                    </div>
                  </PopperWrapper>
                )}
              </div>
            )}
          >
            <i className={cx("icon", "fa-light fa-cart-shopping")}></i>
          </Tippy>
        </div>
      </Link>
    </div>
  );
}

export default CartDropdown;
