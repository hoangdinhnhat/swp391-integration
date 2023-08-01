import classNames from "classnames/bind";
import {NavLink, useLocation} from "react-router-dom";

import styles from "./ProductMngNav.module.scss";

const cx = classNames.bind(styles);

const productNavs = [
    {
        title: "ALL",
        to: "/admin/portal/productmng/all",
    },
    {
        title: "AVAILABLE",
        to: "/admin/portal/productmng/available",
    },
    {
        title: "BANNED",
        to: "/admin/portal/productmng/banned",
    }
];

function ProductMngNav() {
    const {pathname} = useLocation();
    return (
        <div className={cx("product-navbar")}>
            {productNavs.map((catemng, index) => (
                <NavLink
                    to={catemng.to}
                    key={index}
                    className={({isActive}) =>
                        [cx("nav"), isActive ? cx("nav-active") : null].join(" ")
                    }
                    isActive={() =>
                        [
                            "/admin/portal/productmng/all",
                            "/admin/portal/productmng/available",
                            "/admin/portal/productmng/banned",
                        ].includes(pathname)
                    }
                >
                    <span className={cx("nav-text")}>{catemng.title}</span>
                </NavLink>
            ))}
        </div>
    );
}

export default ProductMngNav;
