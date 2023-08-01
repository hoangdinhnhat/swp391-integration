import classNames from "classnames/bind";
import { Link } from "react-router-dom";

// import logo from "~/assets/images/logo.png";
import styles from "./HeaderForm.module.scss";

const cx = classNames.bind(styles);

function HeaderForm({ text = "" }) {
  return (
    <div className={cx("header")}>
      <div className={cx("header-content")}>
        <Link to="/" className={cx("link")}>
          {/* <img src={images} alt="Bird" className={cx('logo')} /> */}
          <p className={cx("text")}>
            <span className={cx("sub-text")}>B</span>ird
            <span className={cx("inner-subText")}>
              <span className={cx("sub-text")}>T</span>rading
            </span>
          </p>
          <div className={cx("otherText")}>{text}</div>
        </Link>
      </div>
    </div>
  );
}

export default HeaderForm;
