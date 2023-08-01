import classNames from "classnames/bind";
import {NavLink, useLocation} from "react-router-dom";

import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

const sideBarOptions = [
    {
        id: 0,
        title: "Dashboard",
        icon: "fa-light fa-table-columns",
        path: "/seller/portal/dashboard",
    },
    {
        id: 1,
        title: "Notifications",
        icon: "fa-light fa-bell",
        path: "/seller/portal/notifications",
    },
    {
        id: 2,
        title: "Data Chart",
        icon: "fa-light fa-chart-line-up",
        path: "/seller/portal/chart",
    },
    {
        id: 3,
        title: "Order",
        icon: "fa-thin fa-clipboard-list",
        path: "/seller/portal/order/all",
    },
    {
        id: 4,
        title: "Product",
        icon: "fa-sharp fa-light fa-box-dollar",
        path: "/seller/portal/product/all",
    },
    {
        id: 5,
        title: "Message",
        icon: "fa-light fa-comment-dots",
        path: "/seller/portal/message",
    },
    {
        id: 6,
        title: "Shop",
        icon: "fa-light fa-bag-shopping",
        path: "/seller/portal/shop",
    },
    {
        id: 7,
        title: "Feedback",
        icon: "fa-light fa-comment-exclamation",
        path: "/seller/portal/feedback",
    },
];

function SideBar() {
    const {pathname} = useLocation();

    return (
        <>
            <div className={cx("side-bar_wrapper")}>
                <div className={cx("side-bar_container")}>
                    <div className={cx("side-bar_menu-item")}>
                        {sideBarOptions.map((option) => (
                            <NavLink
                                to={option.path}
                                key={option.id}
                                className={({isActive}) =>
                                    [cx("nav-item"), isActive ? cx("nav-active") : null].join(" ")
                                }
                                isActive={() =>
                                    [
                                        "/seller/portal/dashboard",
                                        "/seller/portal/order/all",
                                        "/seller/portal/product/all",
                                        "/seller/portal/shop",
                                        "/seller/portal/finance",
                                        "/seller/portal/chart",
                                    ].includes(pathname)
                                }
                            >
                                <i className={cx(option.icon, "nav-icon")}></i>
                                <span className={cx("nav-text")}>{option.title}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
