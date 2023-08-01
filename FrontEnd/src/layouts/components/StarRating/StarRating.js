import classNames from "classnames/bind";

import styles from "./StarRating.module.scss";

const cx = classNames.bind(styles);

function StarRating({rating, font, color}) {
    const percentage = Math.round((rating / 5) * 100);
    return (
        <div className={cx("rating-star")}>
            <i
                className={cx("fa-sharp fa-solid fa-star", "rate_icon")}
                style={{fontSize: `${font}rem`, color: color}}
            ></i>
            <i
                className={cx("fa-sharp fa-solid fa-star", "rate_icon")}
                style={{fontSize: `${font}rem`, color: color}}
            ></i>
            <i
                className={cx("fa-sharp fa-solid fa-star", "rate_icon")}
                style={{fontSize: `${font}rem`, color: color}}
            ></i>
            <i
                className={cx("fa-sharp fa-solid fa-star", "rate_icon")}
                style={{fontSize: `${font}rem`, color: color}}
            ></i>
            <i
                className={cx("fa-sharp fa-solid fa-star", "rate_icon")}
                style={{fontSize: `${font}rem`, color: color}}
            ></i>

            <div
                className={cx("overlay")}
                style={{width: `${100 - percentage}%`}}
            ></div>
        </div>
    );
}

export default StarRating;
