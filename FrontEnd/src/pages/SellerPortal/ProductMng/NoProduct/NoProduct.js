import classNames from "classnames/bind";
import styles from "./NoProduct.module.scss";

const cx = classNames.bind(styles);

function NoProduct() {
    return (
        <div className={cx("no-product_container")}>
            <div className={cx("content")}>
                <div className={cx("no-product-img")}></div>
                <div className={cx("no-product-text")}>No products found</div>
            </div>
        </div>
    );
}

export default NoProduct;
