import classNames from "classnames/bind";
import {NavLink, useLocation} from "react-router-dom";

import styles from "./NavBar.module.scss";

const cx = classNames.bind(styles);

const orderNavs = [
    {
        title: "All",
        to: "/seller/portal/order/all",
    },
    {
        title: "Contact",
        to: "/seller/portal/order/contact",
    },
    {
        title: "Pending",
        to: "/seller/portal/order/pending",
    },
    {
        title: "Shipping",
        to: "/seller/portal/order/shipping",
    },
    {
        title: "Completed",
        to: "/seller/portal/order/complete",
    },
    {
        title: "Cancelled",
        to: "/seller/portal/order/cancel",
    },
    {
        title: "Refund",
        to: "/seller/portal/order/refund",
    },
];

function NavBar() {
    const {pathname} = useLocation();
    return (
        <div className={cx("order-navbar")}>
            {orderNavs.map((order, index) => (
                <NavLink
                    to={order.to}
                    key={index}
                    className={({isActive}) =>
                        [cx("nav"), isActive ? cx("nav-active") : null].join(" ")
                    }
                    isActive={() =>
                        [
                            "/seller/portal/order",
                            "/seller/portal/order/pending",
                            "/seller/portal/order/shipping",
                            "/seller/portal/order/complete",
                            "/seller/portal/order/cancel",
                        ].includes(pathname)
                    }
                >
                    <span className={cx("nav-text")}>{order.title}</span>
                </NavLink>
            ))}
        </div>
    );
}

export default NavBar;
