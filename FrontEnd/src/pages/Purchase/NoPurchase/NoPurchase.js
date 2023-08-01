import classNames from "classnames/bind";
import styles from "./NoPurchase.module.scss";

const cx = classNames.bind(styles);

function NoPurchase() {
    return (
        <div className={cx("no-purchase_item")}>
            <div className={cx("no-purchase_item-content")}>
                <img
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png"
                    alt="img"
                    className={cx("no_item-img")}
                />
                <span className={cx("text")}>No orders yet</span>
            </div>
        </div>
    );
}

export default NoPurchase;
