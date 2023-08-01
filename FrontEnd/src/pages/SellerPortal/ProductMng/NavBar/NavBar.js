import classNames from "classnames/bind";
import {NavLink, useLocation} from "react-router-dom";

import styles from './NavBar.module.scss'

const cx = classNames.bind(styles)

const orderNavs = [
    {
        title: "All",
        to: "/seller/portal/product/all",
    },
    {
        title: "Active",
        to: "/seller/portal/product/active",
    },
    {
        title: "Sold out",
        to: "/seller/portal/product/soldout",
    },
    {
        title: "Ban",
        to: "/seller/portal/product/ban",
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
                            "/seller/portal/product/all",
                            "/seller/portal/product/active",
                            "/seller/portal/product/soldout",
                            "/seller/portal/product/ban",
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