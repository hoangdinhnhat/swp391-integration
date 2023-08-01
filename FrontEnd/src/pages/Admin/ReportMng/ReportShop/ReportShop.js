import classNames from "classnames/bind";
import styles from "./ReportShop.module.scss";
import axios from "axios";
import {useEffect, useState} from "react";

const cx = classNames.bind(styles);

function ReportShop() {
    const [shopReports, setShopReports] = useState([]);

    useEffect(() => {
        axios
            .get("/api/v1/admin/management/report/shop")
            .then((res) => {
                setShopReports(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    const handleBanShop = (e, sr) => {
        e.preventDefault()
        axios
            .post("/api/v1/admin/report/shop/" + sr.id + "?action=BAN")
            .then((res) => {
                window.location.reload()
            })
            .catch((e) => console.log(e));
    }

    const handleWarningShop = (e, sr) => {
        e.preventDefault()
        axios
            .post("/api/v1/admin/report/shop/" + sr.id + "?action=WARNING")
            .then((res) => {
                window.location.reload()
            })
            .catch((e) => console.log(e));
    }

    return (
        <div className={cx("report-product")}>
            <div className={cx("report-header")}>
                <div className={cx("user")}>User</div>
                <div className={cx("shop")}>Shop</div>
                <div className={cx("type-reason")}>Type of Reason</div>
                <div className={cx("reason")}>Reason</div>
                <div className={cx("actions")}>Actions</div>
            </div>
            <div className={cx("report-list")}>
                {shopReports.map((sr, srId) => (
                    <div className={cx("report-item")} key={srId}>
                        <div className={cx("rp-user")}>
                            <img
                                src={sr.reporter.imageurl}
                                alt="avatar-user"
                                className={cx("avatar-user")}
                            />
                            <div className={cx("user-name")}>
                                {sr.reporter.firstname + " " + sr.reporter.lastname}
                            </div>
                        </div>
                        <div className={cx("rp-shop")}>
                            <img
                                src={sr.shop.shopImage}
                                alt="shop-avatar"
                                className={cx("shop-avatar")}
                            />
                            <div className={cx("shop-name")}>{sr.shop.name}</div>
                        </div>
                        <div className={cx("rp-type-reason")}>
                            <div className={cx("text")}>{sr.reasonType}</div>
                        </div>
                        <div className={cx("rp-reason")}>
                            <div className={cx("text")}>{sr.reasonSpecific}</div>
                        </div>
                        <div className={cx("rp-actions")}>
                            <button className={cx("ban-btn")} onClick={e => handleBanShop(e, sr)}>
                                <i className={cx("fa-regular fa-ban", "ban-icon")}></i>
                            </button>
                            <button className={cx("notify-btn")} onClick={e => handleWarningShop(e, sr)}>
                                <i
                                    className={cx(
                                        "fa-regular fa-triangle-exclamation",
                                        "notify-icon"
                                    )}
                                ></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx("prev-next")}>
                <button className={cx("icon-left")}>
                    <i className={cx("fa-light fa-angle-left")}></i>
                </button>
                <button className={cx("icon-right")}>
                    <i className={cx("fa-light fa-angle-right")}></i>
                </button>
            </div>
        </div>
    );
}

export default ReportShop;
