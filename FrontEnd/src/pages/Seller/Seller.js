import classNames from "classnames/bind";

import HeaderForm from "~/layouts/components/HeaderForm";
import {UserContext} from "~/userContext/Context";
import styles from "./Seller.module.scss";

import {Link, Navigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

const cx = classNames.bind(styles);

function Seller() {

    const [isHasShop, setIsHasShop] = useState();
    const [showRegistration, setShowRegistration] = useState(false)
    const UC = useContext((UserContext))
    const context = UC.state

    useEffect(() => {
        if (context) {
            if (!context.shopDTO) {
                setShowRegistration(true)
            } else {
                setIsHasShop(true)
            }
        }
    }, [context]);

    return (
        <>
            <HeaderForm text="Seller Centre"/>
            {isHasShop && <Navigate to={"portal/dashboard"}/>}
            {showRegistration && <div className={cx("seller_wrapper")}>
                <div className={cx("seller_container")}>
                    <div className={cx("seller-welcome")}>
                        <img
                            src="https://cdn0.iconfinder.com/data/icons/seo-and-development-6/155/vector_290_21-256.png"
                            alt="welcome-img"
                            className={cx("welcome-img")}
                        />
                        <div className={cx("header")}>
                            Welcome to Bird Trading Platform!
                        </div>
                        <div className={cx("text")}>
                            To register to sell on the Bird Trading Platform, you need to
                            provide some basic information.
                        </div>
                        <Link to="register" className={cx("register-link")}>Register</Link>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Seller;
