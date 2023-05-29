import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import gmail from "~/assets/images/gmail.png";
import github from "~/assets/images/github.png";
import location from "~/assets/images/location.png";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("footer")}>
      <div className={cx("container")}>
        <div className={cx("footer-section")}>
          <div className={cx("footer-item")}>
            <p className={cx("main-title")}>Bird Trading Platform</p>
          </div>
          <div className={cx("footer-item")}>
            <p className={cx("title")}>SHOP</p>
            <div className={cx("footer-item-text")}>
              <Link to="/bird" className={cx("link")}>
                <p>Bird</p>
              </Link>
              <Link to="/bird-food" className={cx("link")}>
                <p>Bird food</p>
              </Link>
              <Link to="/bird-accessories" className={cx("link")}>
                <p>Bird accessories</p>
              </Link>
              <Link to="/login" className={cx("link")}>
                <p>Login</p>
              </Link>
              <Link to="/signup" className={cx("link")}>
                <p>Sign up</p>
              </Link>
            </div>
          </div>

          <div className={cx("footer-item")}>
            <p className={cx("title")}>ABOUT US</p>
            <div className={cx("intro-project")}>
              <p className={cx("text-about")}>
                Welcome to our bird trading platform! We are a passionate team
                of bird enthusiasts dedicated to connecting bird lovers with
                their perfect feathered friends. Our platform offers a wide
                variety of birds for sale, from common species to rare and
                exotic breeds.
              </p>
            </div>
          </div>

          <div className={cx("footer-item")}>
            <p className={cx("title")}>CONTACT US</p>
            <div className={cx("footer-item-text")}>
              <div className={cx("social-media-mail")}>
                <img src={gmail} alt="gmail" className={cx("logo")}></img>
                <p className={cx("text")}>swp391.birdtrading@gmail.com</p>
              </div>
              <div className={cx("social-media-github")}>
                <img src={github} alt="github" className={cx("logo")}></img>
                <a href="/github" className={cx("link")}>
                  <p>Github</p>
                </a>
              </div>
              <div className={cx("location")}>
                <img src={location} alt="location" className={cx("logo")}></img>
                <p className={cx("text")}>
                  SE1741, FPT University, HCM City, VietNam
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className={cx("footer-section-below")}>
          <div className={cx("copy-right")}>
            <p className={cx("copy-right-text")}>
              @{new Date().getFullYear()} Bird Trading Platform. All right
              reserved.
            </p>
          </div>
          <div className={cx("below-link")}>
            <Link to="" className={cx("text-link-below")}>
              Term of service
            </Link>
            <Link to="" className={cx("text-link-below")}>
              Privacy policy
            </Link>
            <Link to="" className={cx("text-link-below")}>
              Shipping policy
            </Link>
            <Link to="" className={cx("text-link-below")}>
              Violation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
