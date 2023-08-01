import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { Link } from "react-router-dom";
import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);

const notifications = [];

function Notification() {
  return (
    <div className={cx("notifications")}>
      <div className={cx("count-notify")}>10</div>
      {/* <i className={cx("fa-regular fa-bell", "icon-notify")}></i> */}
      <Link to="/admin/portal/notifications">
        <div className={cx("dropdown-notify")}>
          <Tippy
            interactive
            delay={[0, 200]}
            placement="bottom"
            render={(attrs) => (
              <div className={cx("notify-items")} tabIndex="-1" {...attrs}>
                {notifications.length < 1 ? (
                  <div className={cx("no-notify")}>
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/fa4e2b534c2928596a6deded9c730a21.png"
                      alt="No item"
                    ></img>
                    <p>No notify yet!</p>
                  </div>
                ) : (
                  <PopperWrapper className={cx("dropdown_container")}>
                    <div className={cx("notify-head")}>
                      Recently Received Notifications
                    </div>
                    <div className={cx("notify-container")}>
                      {notifications.slice(0, 7).map((notification, index) => (
                        <div
                          className={cx("notify-content")}
                          key={index}
                          // onClick={(e) =>
                          //   handleClickNotification(e, notification)
                          // }
                        >
                          <img
                            src={notification.imageUrl}
                            alt="notify-img"
                            className={cx("notify-img")}
                          />
                          <div className={cx("notify-info")}>
                            <div className={cx("title-notify")}>
                              {notification.title}
                            </div>
                            <div className={cx("notify-desc")}>
                              {notification.content}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={cx("notify-footer")}>
                      {/* <a className={cx("view-all")} onClick={handleViewAll}>
                        View All
                      </a> */}
                      <a className={cx("view-all")}>View All</a>
                    </div>
                  </PopperWrapper>
                )}
              </div>
            )}
          >
            <i className={cx("fa-regular fa-bell", "bell-icon")}></i>
          </Tippy>
        </div>
      </Link>
    </div>
  );
}

export default Notification;
