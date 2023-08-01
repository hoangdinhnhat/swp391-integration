import classNames from "classnames/bind";

import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import NavBar from "../NavBar";
import NoPurchase from "../NoPurchase/NoPurchase";
import {Cartcontext} from "~/context/Context";
import {UserContext} from "~/userContext/Context";

import styles from "./Cancelled.module.scss";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Cancelled() {
    const [openFeedback, setOpenFeedback] = useState(false);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const userContext = useContext(UserContext);
    const user = userContext.state;
    const cartContext = useContext(Cartcontext);
    const dispatch = cartContext.dispatch;
    const [buyed, setBuyed] = useState(false);
    const [rebuy, setRebuy] = useState();
    const navigate = useNavigate();

    const handleRebuy = (e, order) => {
        e.preventDefault();
        if (user) {
            let rebuyProduct = order.orderDetails.map((od) => od.product.id);
            setRebuy(rebuyProduct);
            rebuyProduct.forEach((p) => {
                dispatch({type: "ADD", payload: p});
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
            .get("/api/v1/users/orders/search?filter=CANCELLED&page=" + page)
            .then((res) => setOrders(res.data))
            .catch((e) => console.log(e));
    }, []);

    const roundedFloat = (float) => {
        return Math.round((float + Number.EPSILON) * 100) / 100;
      };

    return (
        <>
            <Header/>
            <div className={cx("cancelled_wrapper")}>
                <div className={cx("cancelled_container")}>
                    <NavBar/>
                    {!orders || orders.length === 0 ? (
                        <NoPurchase/>
                    ) : (
                        orders.map((order, index) => (
                            <div className={cx("purchase_item")} key={index}>
                                <div className={cx("purchase_item-info")}>
                                    <div className={cx("purchase_item-header")}>
                                        <div className={cx("shop-name")}>{order.shop.name}</div>
                                        <div
                                            className={cx("status")}
                                        >
                                            {order.status}
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
                                            <a className={cx("buy-btn")} onClick={(e) => handleRebuy(e, order)}>
                                                Buy Again
                                            </a>
                                        )}
                                        <button className={cx("contact-btn")}>
                                            Contact Seller
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Cancelled;
