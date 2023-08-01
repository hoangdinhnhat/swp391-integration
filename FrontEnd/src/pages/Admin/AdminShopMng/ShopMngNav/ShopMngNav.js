import classNames from "classnames/bind";
import {NavLink, useLocation} from "react-router-dom";

import styles from "./ShopMngNav.module.scss";

const cx = classNames.bind(styles);

const shopNavs = [
    {
        title: "ALL",
        to: "/admin/portal/shopmng/all",
    },
    {
        title: "AVAILABLE",
        to: "/admin/portal/shopmng/available",
    },
    {
        title: "BANNED",
        to: "/admin/portal/shopmng/banned",
    },
];

function UserMngNav() {
    const {pathname} = useLocation();
    return (
        <div className={cx("shop-navbar")}>
            {shopNavs.map((catemng, index) => (
                <NavLink
                    to={catemng.to}
                    key={index}
                    className={({isActive}) =>
                        [cx("nav"), isActive ? cx("nav-active") : null].join(" ")
                    }
                    isActive={() =>
                        [
                            "/admin/portal/shopmng/all",
                            "/admin/portal/shopmng/available",
                            "/admin/portal/shopmng/banned",
                        ].includes(pathname)
                    }
                >
                    <span className={cx("nav-text")}>{catemng.title}</span>
                </NavLink>
            ))}
        </div>
    );
}

export default UserMngNav;
