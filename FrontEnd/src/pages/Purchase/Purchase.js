import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import NavBar from "./NavBar";
import NoPurchase from "./NoPurchase/NoPurchase";
import { Cartcontext } from "~/context/Context";
import { UserContext } from "~/userContext/Context";
import ChatPupup from "~/layouts/components/ChatPopup";

import styles from "./Purchase.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const cx = classNames.bind(styles);

const styleStatus = (status) => {
  if (status === "Completed") {
    return {
      color: "var(--primary)",
    };
  } else if (status === "Canceled") {
    return {
      color: "#ff1616",
    };
  } else if (status === "Pending") {
    return {
      color: "#feb019",
    };
  } else if (status === "Refund") {
    return {
      color: "red",
    };
  } else {
    return {
      color: "#008ffb",
    };
  }
};

var stompClient = null;

function Purchase() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const userContext = useContext(UserContext);
  const user = userContext.state;
  const cartContext = useContext(Cartcontext);
  const dispatch = cartContext.dispatch;
  const [buyed, setBuyed] = useState(false);
  const [rebuy, setRebuy] = useState();
  const [openChat, setOpenChat] = useState(false);
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
      .get("/api/v1/users/orders/search?page=" + page)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleNewConversation = (event, shopId) => {
    event.preventDefault();
    axios
      .get("/api/v1/users/info")
      .then((res) => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect(
          {},
          () => onConnected(shopId, res.data.id),
          (e) => console.log(e)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onConnected = (shopId, userId) => {
    const request = {
      fromId: userId,
      toId: shopId,
      content: "Let's Start",
      sendTime: new Date(),
      chatterType: "USER",
    };
    stompClient.send("/app/conversation-request", {}, JSON.stringify(request));
    setOpenChat(true);
  };

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <>
      <Header />
      <div className={cx("purchase_wrapper")}>
        <div className={cx("purchase_container")}>
          <ChatPupup openChat={openChat} setOpenChat={setOpenChat} />
          <NavBar />
          {!orders || orders.length === 0 ? (
            <NoPurchase />
          ) : (
            orders.map((order, index) => (
              <div className={cx("purchase_item")} key={index}>
                <div className={cx("purchase_item-info")}>
                  <div className={cx("purchase_item-header")}>
                    <div className={cx("shop-name")}>{order.shop.name}</div>
                    <div
                      className={cx("status")}
                      style={styleStatus(order.status)}
                    >
                      {order.status.startsWith("SPECIAL")
                        ? "SPECIAL"
                        : order.status}
                    </div>
                  </div>
                  {order.orderDetails.map((item) => (
                    <div className={cx("purchase_item-detail")} key={item.id}>
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
                      <div className={cx("price")}>${roundedFloat(item.soldPrice)}</div>
                    </div>
                  ))}
                </div>
                <div className={cx("purchase_item_order-total")}>
                  <div className={cx("order-total-detail")}>
                    <div className={cx("text")}>Order Total:</div>
                    <div className={cx("price")}>${roundedFloat(order.soldPrice + order.shippingFee)}</div>
                  </div>
                </div>
                <div className={cx("purchase_item-options")}>
                  <div className={cx("text")}>No rating received</div>
                  <div className={cx("button")}>
                    {(order.status === "Completed" ||
                      order.status === "Canceled") && (
                      <a
                        className={cx("buy-btn")}
                        onClick={(e) => handleRebuy(e, order)}
                      >
                        Buy Again
                      </a>
                    )}
                    <button className={cx("contact-btn")} onClick={(e) => handleNewConversation(e, order.shop.id)}>
                      Contact Seller
                    </button>
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

export default Purchase;
