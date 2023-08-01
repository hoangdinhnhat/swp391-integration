import classNames from "classnames/bind";

import styles from "./HeaderFilter.module.scss";

const cx = classNames.bind(styles);

function HeaderFilter({title, onBack}) {
    return (
        <header className={cx("header")}>
            <button className={cx("back-btn")} onClick={onBack}>
                <i className="fa-sharp fa-regular fa-chevron-down fa-rotate-90"></i>
            </button>
            <span className={cx("header-title")}>{title}</span>
        </header>
    );
}

export default HeaderFilter;
