import classNames from "classnames/bind";
import styles from "./RecentOrder.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";

const cx = classNames.bind(styles);

const statusStyle = (status) => {
    if (status === "COMPLETED") {
        return {
            backgroundColor: "#EBF9F4",
            color: "#39B588",
        };
    } else if (status === "CANCELED") {
        return {
            backgroundColor: "#FDF4F6",
            color: "#E36482",
        };
    } else if (status === "PENDING") {
        return {
            backgroundColor: "#FFF7E6",
            color: "#FFB619",
        };
    } else if (status === "SHIPPING") {
        return {
            backgroundColor: "#F2F4F8",
            color: "#1B4780",
        };
    }
};

function RecentOrder() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios
            .get("/api/v1/shop/orders/search?page=" + page)
            .then((res) => setOrders(res.data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className={cx("recent-orders")}>
            <div className={cx("order-header")}>
                <div className={cx("head", "orderId")}>ID</div>
                <div className={cx("head", "product")}>Order</div>
                <div className={cx("head", "date")}>Date</div>
                <div className={cx("head", "status")}>Status</div>
                <div className={cx("head", "amount")}>Amount</div>
            </div>
            {orders.map((order, index) => (
                <div className={cx("order-content")} key={index}>
                    <div className={cx("orderId")}>#{order.id}</div>
                    <div className={cx("product")}>
                        <div className={cx("name")}>
                            List Order({order.orderDetails.length})
                        </div>
                    </div>
                    <div className={cx("date")}>
                        {new Date(order.createdTime).toLocaleTimeString()}
                    </div>
                    <div className={cx("status")}>
                        <div
                            className={cx("inside-status")}
                            style={statusStyle(order.status)}
                        >
                            {order.status}
                        </div>
                    </div>
                    <div className={cx("amount")}>${order.sellPrice}</div>
                </div>
            ))}
        </div>
    );
}

export default RecentOrder;
