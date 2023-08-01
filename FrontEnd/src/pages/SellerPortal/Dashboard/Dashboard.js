import classNames from "classnames/bind";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import Widget from "./Widget";
import OverViewChart from "./OverViewChart";
import DoughnutChart from "./DoughnutChart";
import RecentOrder from "./RecentOrder";
import TopSale from "./TopSale";

import styles from "./Dashboard.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

const colorData = (type) => {
    if (type === "Revenue") {
        return {
            color: "#30D003",
        };
    } else if (type === "Order") {
        return {
            color: "#EC4A68",
        };
    } else if (type === "Follower") {
        return {
            color: "#448DFB",
        };
    } else {
        return {
            color: "#30E3CD",
        };
    }
};

function Dashboard() {
    const [widgets, setWidgets] = useState([
        {
            id: 0,
            type: "Revenue",
            icon: "fa-solid fa-sack-dollar",
            isMoney: true,
            data: 0,
            title: "Today profit",
            changeData: 0,
            changePercent: 0,
            previous: [],
            current: [],
        },
        {
            id: 1,
            type: "Order",
            icon: "fa-solid fa-cart-shopping",
            isMoney: false,
            data: 0,
            title: "Today orders",
            changeData: 0,
            changePercent: 0,
            previous: [],
            current: [],
        },
        {
            id: 2,
            type: "Follower",
            icon: "fa-solid fa-user-plus",
            isMoney: false,
            data: 0,
            title: "Today followers",
            changeData: 0,
            changePercent: 0,
            previous: [],
            current: [],
        },
        {
            id: 3,
            type: "Feedback",
            icon: "fa-solid fa-messages-question",
            isMoney: false,
            data: 0,
            title: "Today feedbacks",
            changeData: 0,
            changePercent: 0,
            previous: [],
            current: [],
        },
    ]);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        axios
            .get("/api/v1/shop/analyst/real-time")
            .then((res) => {
                console.log(res.data);
                res.data.forEach((item, index) => {
                    let totalPrev = item.prev.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        0
                    );
                    let totalCur = item.cur.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        0
                    );
                    console.log(item, totalPrev, totalCur)
                    widgets[index].previous = [0, ...item.prev];
                    widgets[index].current = [0, ...item.cur];
                    widgets[index].data = totalCur
                    widgets[index].changeData = totalCur - totalPrev
                    if (totalPrev === 0) {
                        widgets[index].changePercent = totalCur - totalPrev
                    } else widgets[index].changePercent = Math.round((totalCur / totalPrev) * 100 - 100)
                    setWidgets(Array.from(widgets));
                });
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        document.title = "Seller Centre";
    }, [])

    return (
        <>
            <HeaderSeller title="Dashboard"/>
            <div className={cx("dashboard_wrapper")}>
                <div className={cx("dashboard_sidebar")}>
                    <SideBar/>
                </div>
                <div className={cx("dashboard_container")}>
                    <div className={cx("dashboard_content")}>
                        <div className={cx("daily-information")}>
                            {widgets.map((widget, index) => (
                                <Widget key={index} widget={widget} setIndex={setIndex}/>
                            ))}
                        </div>

                        <div className={cx("chart_overview")}>
                            <div className={cx("chart-total")}>
                                <div className={cx("chart-title")}>
                                    Total {widgets[index].type}
                                </div>
                                <div
                                    className={cx("chart-data")}
                                    style={colorData(widgets[index].type)}
                                >
                                    {widgets[index].isMoney ? "$" : ""}
                                    {(() => {
                                        let formattedNumber = widgets[index].data.toLocaleString();
                                        return formattedNumber;
                                    })()}
                                </div>
                                <OverViewChart dataChart={widgets[index]}/>
                            </div>
                            <div className={cx("chart-revenue-by-category")}>
                                <div className={cx("title")}>Total Sale</div>
                                <DoughnutChart/>
                            </div>
                        </div>

                        <div className={cx("product_list")}>
                            <div className={cx("list_recent-orders")}>
                                <div className={cx("header")}>
                                    <div className={cx("title")}>Recent Orders</div>
                                    <Link
                                        to="/seller/portal/order/all"
                                        className={cx("see-more")}
                                    >
                                        See more
                                    </Link>
                                </div>
                                <RecentOrder/>
                            </div>

                            <div className={cx("list_top-sales")}>
                                <div className={cx("header")}>
                                    <div className={cx("title")}>Top Sales</div>
                                    <Link
                                        to="/seller/portal/product/all"
                                        className={cx("see-more")}
                                    >
                                        See more
                                    </Link>
                                </div>
                                <div className={cx("list-product")}>
                                    <TopSale/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
