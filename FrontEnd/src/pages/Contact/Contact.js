import Header from "~/layouts/components/Header";
import classNames from "classnames/bind";

import styles from "./Contact.module.scss";
import Footer from "~/layouts/components/Footer/";
const cx = classNames.bind(styles);
function Contact() {
  return (
    <>
      <Header />
      <div className={cx("contact-wrapper")}>
        <div className={cx('container')}>
            <div className={cx("contact-container")}>
              <div className={cx("contact-details")}>
                <i className={cx("fa-light fa-envelope", "icon")}></i>
                <div className={cx("contact-title")}>
                  <p>Email us</p>
                </div>
                <div className={cx("contact-info")}>
                  <span>swp391.birdtrading@gmail.com</span>
                  <span>
                    {" "}
                    Interactively grow empowered for process-centric total linkage
                  </span>
                </div>
              </div>
              <div className={cx("contact-details")}>
                <i className={cx("fa-light fa-phone", "icon")}></i>
                <div className={cx("contact-title")}>
                  <p>Call us</p>
                </div>
                <div className={cx("contact-info")}>
                  <span>0123456789</span>
                  <span>
                    {" "}
                    Distinctively disseminate focused solutions clicks-and-mortar
                    ministate
                  </span>
                </div>
              </div>
              <div className={cx("contact-details")}>
                <i className={cx("fa-regular fa-location-dot", "icon")}></i>
                <div className={cx("contact-title")}>
                  <p>Location</p>
                </div>
                <div className={cx("contact-info")}>
                  <p>SE1741, FPT University, HCM City, VietNam</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
export default Contact;
