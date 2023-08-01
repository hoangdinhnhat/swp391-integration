import classNames from "classnames/bind";

import styles from "./Checkout.module.scss";

const cx = classNames.bind(styles);

function PaymentMethod({payment, paymentId, setPaymentId}) {

    return (
        <div
            className={(paymentId === payment.id) ? cx("card-container-active") : cx("card-container")}
            onClick={() => setPaymentId(payment.id)}
        >
            <div className={cx("cash")}>
                <div className={cx("main-content")}>
                    <div className={cx("left")}>
                        <img src={payment.image} alt="icon" className={cx("cash-svg")}/>
                        <div className={cx("cash-text")}>{payment.title}</div>
                    </div>
                    <div className={cx("cash-icon")}>
                        <i
                            className={
                                (paymentId === payment.id)
                                    ? cx("fa-sharp fa-solid fa-circle-check", "icon-active")
                                    : cx("fa-sharp fa-regular fa-circle", "icon")
                            }
                        ></i>
                    </div>
                </div>
                <div className={cx("footer")}>
                    <div className={cx("text")}>{payment.subTitle}</div>
                </div>
            </div>
        </div>
    );
}

export default PaymentMethod;
