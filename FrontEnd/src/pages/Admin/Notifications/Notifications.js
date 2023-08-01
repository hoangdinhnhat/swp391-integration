import classNames from "classnames/bind";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import styles from "./Notifications.module.scss";

const cx = classNames.bind(styles);

const notifications = [];

function Notifications() {
  return (
    <>
      <Topbar />
      <div className={cx("notify_wrapper")}>
        <div className={cx("notify_sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("notify_container")}>
          <div className={cx("notify_content")}>
            <div className={cx("notify-header")}>
              <div className={cx("title")}>Notifications</div>
              <div className={cx("read")}>
                {/* <button className={cx("read-btn")} onClick={handleMarkAllRead}>
                  Mark all as read
                </button> */}
                <button className={cx("read-btn")}>Mark all as read</button>
              </div>
            </div>
            <div className={cx("notify-list")}>
              {notifications.map((notification, index) => (
                <div
                  className={cx("notify")}
                  // onClick={(e) => handleClickNotification(e, notification)}
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
                    <div className={cx("notify-date-time")}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={cx("prev-next")}>
              <button
                className={cx("icon-left")}
                // onClick={handlePrevPage}
                // disabled={page === 1}
              >
                <i className={cx("fa-light fa-angle-left")}></i>
              </button>
              <button
                className={cx("icon-right")}
                // onClick={handleNextPage}
                // disabled={page === maxPage}
              >
                <i className={cx("fa-light fa-angle-right")}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
