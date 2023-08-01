import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function BannerItem({ imgItem, text, path }) {
  return (
    <div className={cx("banner-item")}>
      <img src={imgItem} alt="banner-item" />
      <div className={cx("banner-text")}>
        <div className={cx("text")}>{text}</div>
        <Link to={path} className={cx("shop-btn")}>Shop now</Link>
      </div>
    </div>
  );
}

export default BannerItem;
