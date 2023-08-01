import classNames from "classnames/bind";

import styles from "./Toast.module.scss";

const cx = classNames.bind(styles);

function Toast() {
    return (
        <div className={cx("toast")}>
            <div className={cx("toast_popup")}>
                <div className={cx("toast_container")}>
                    <div className={cx("toast_icon")}>
                        <div className={cx("action-toast_icon")}>
                            <i className={cx("fa-solid fa-check", "icon")}></i>
                        </div>
                    </div>
                    <div className={cx("toast_text")}>
                        Item has been added to your shopping cart
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Toast;
