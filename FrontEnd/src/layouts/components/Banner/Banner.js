import classNames from "classnames/bind";
// import { Link } from "react-router-dom";
import banner from "~/assets/images/banner.png";
import banner1 from "~/assets/images/banner1.jpg";
// import banner2 from "~/assets/images/banner2.jpg";
// import banner3 from "~/assets/images/banner3.jpg";
// import banner4 from "~/assets/images/banner4.jpg";
import styles from "./Banner.module.scss";

const cx = classNames.bind(styles);

// const birds = [
//   {
//     url: banner,
//   },
//   {
//     url: banner1,
//   },
//   {
//     url: banner2,
//   },
//   {
//     url: banner3,
//   },
//   {
//     url: banner4,
//   },
// ];

function Banner() {
  return (
    <div className={cx("banner")}>
      <div className={cx("banner-slider")}>
        <img src={banner} alt="banner-slider" />
      </div>
      <div className={cx("banner-right")}>
        <div className={cx("banner-item-1")}>
          <img src={banner1} alt="banner-item" />
        </div>
        <div className={cx("banner-item-2")}>
          <img src={banner1} alt="banner-item" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
