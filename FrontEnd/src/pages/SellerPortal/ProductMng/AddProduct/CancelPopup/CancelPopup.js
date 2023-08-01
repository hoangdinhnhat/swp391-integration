import classNames from "classnames/bind";
import {Link} from "react-router-dom";

import styles from "./CancelPopup.module.scss";

const cx = classNames.bind(styles);

function CancelPopup({setShowCancelPopup}) {
    return (
        <>
            <div className={cx("overlay")}>
                <div className={cx("cancel_popup")}>
                    <div className={cx("header")}>
                        <span>Confirm</span>
                        <i
                            className={cx("fa-light fa-xmark")}
                            onClick={() => setShowCancelPopup(false)}
                        ></i>
                    </div>
                    <div className={cx("message")}>Cancel changes?</div>
                    <div className={cx("action")}>
                        <button
                            className={cx("cancel-btn")}
                            onClick={() => setShowCancelPopup(false)}
                        >
                            Cancel
                        </button>
                        <Link to="/seller/portal/product/all" className={cx("confirm-btn")}>
                            Confirm
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CancelPopup;
