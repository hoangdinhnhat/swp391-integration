import classNames from "classnames/bind";
import banner from "~/assets/images/banner.png";
import banner1 from "~/assets/images/banner6.jpg";
import banner4 from "~/assets/images/banner4.jpg";
import BannerItem from "./BanerItem";
import styles from "./Banner.module.scss";

const cx = classNames.bind(styles);

function Banner() {
  return (
    <div className={cx("banner")}>
      <div className={cx("banner-slider")}>
        <img src={banner} alt="banner-slider" />
      </div>
      <div className={cx("banner-right")}>
        <BannerItem imgItem={banner1} text={"Fly High with Feathered Friends!"} path="http://localhost:3000/category?categoryId=1"/>
        <BannerItem imgItem={banner4} text={"Nutrition Wings for Your Feathered Friends!"} path="http://localhost:3000/category?categoryId=2"/>
      </div>
    </div>
  );
}

export default Banner;
