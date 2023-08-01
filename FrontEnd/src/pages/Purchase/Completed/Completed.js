import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import NavBar from "../NavBar";
import SendFeedback from "./SendFeedback";
import NoPurchase from "../NoPurchase/NoPurchase";
import Reply from "./Reply";
import { Cartcontext } from "~/context/Context";
import { UserContext } from "~/userContext/Context";

import styles from "./Completed.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Completed() {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const userContext = useContext(UserContext);
  const user = userContext.state;
  const cartContext = useContext(Cartcontext);
  const dispatch = cartContext.dispatch;
  const [buyed, setBuyed] = useState(false);
  const [rebuy, setRebuy] = useState();
  const [order, setOrder] = useState();
  const [openSendReport, setOpenSendReport] = useState(false);
  const [curOrder, setCurOrder] = useState();
  const [changed, setChanged] = useState(false)
  const navigate = useNavigate();

  const handleRebuy = (e, order) => {
    e.preventDefault();
    if (user) {
      let rebuyProduct = order.orderDetails.map((od) => od.product.id);
      setRebuy(rebuyProduct);
      rebuyProduct.forEach((p) => {
        dispatch({ type: "ADD", payload: p });
      });
      setBuyed(true);
    } else navigate("/login");
  };

  useEffect(() => {
    if (buyed) {
      navigate("/cart", {
        state: rebuy,
      });
    }
  }, [cartContext.state]);

  useEffect(() => {
    axios
      .get("/api/v1/users/orders/search?filter=COMPLETED&page=" + page)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e));
  }, [changed]);

  const feedbackCondition = (order) => {
    console.log(order);
    return order.orderDetails.filter((od) => !od.feedbacked).length > 0;
  };

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <>
      {openFeedback && (
        <SendFeedback
          setOpenFeedback={setOpenFeedback}
          order={order}
          setOrder={setOrder}
        />
      )}
      {openSendReport && (
        <Reply setOpenReply={setOpenSendReport} order={curOrder} setChanged={setChanged}/>
      )}
      <Header />
      <div className={cx("completed_wrapper")}>
        <div className={cx("completed_container")}>
          <NavBar />
          {!orders || orders.length === 0 ? (
            <NoPurchase />
          ) : (
            orders.map((order, index) => (
              <div className={cx("purchase_item")} key={index}>
                <div className={cx("purchase_item-info")}>
                  <div className={cx("purchase_item-header")}>
                    <div className={cx("shop-name")}>{order.shop.name}</div>
                    <div className={cx("status")}>{order.status}</div>
                  </div>
                  {order.orderDetails.map((item, index) => (
                    <div
                      className={cx("purchase_item-detail")}
                      key={index}
                      onClick={() =>
                        navigate("/product?productId=" + item.product.id)
                      }
                    >
                      <div className={cx("content")}>
                        <img
                          src={item.product.images[0].url}
                          alt="product-img"
                          className={cx("product-img")}
                        />
                        <div className={cx("product-content")}>
                          <div className={cx("product-name")}>
                            {item.product.name}
                          </div>
                          <div className={cx("quantity")}>x{item.quantity}</div>
                        </div>
                      </div>
                      <div className={cx("price")}>
                        ${roundedFloat(item.soldPrice)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("purchase_item_order-total")}>
                  <div className={cx("order-total-detail")}>
                    <div className={cx("text")}>Order Total:</div>
                    <div className={cx("price")}>
                      ${roundedFloat(order.soldPrice + order.shippingFee)}
                    </div>
                  </div>
                </div>
                <div className={cx("purchase_item-options")}>
                  <div className={cx("text")}>No rating received</div>
                  <div className={cx("button")}>
                    <a
                      className={cx("buy-btn")}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleRebuy(e, order)}
                    >
                      Buy Again
                    </a>
                    {!order.reported && (
                      <button
                        className={cx("reject-btn")}
                        onClick={() => {
                          setOpenSendReport(true);
                          setCurOrder(order);
                        }}
                      >
                        Don't receive the order?
                      </button>
                    )}
                    {feedbackCondition(order) && (
                      <button
                        className={cx("feedback-btn")}
                        onClick={() => {
                          setOpenFeedback(true);
                          setOrder(order);
                        }}
                      >
                        Feedback
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Completed;
