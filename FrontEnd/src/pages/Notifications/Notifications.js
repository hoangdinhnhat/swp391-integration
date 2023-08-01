import classNames from "classnames/bind";
import styles from "./Notifications.module.scss";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import ChatPopup from "~/layouts/components/ChatPopup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Notifications() {
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [notifications, setNotifications] = useState(() => {
    if (state) return state;
    return [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/users/notifications/max-page")
      .then((res) => setMaxPage(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (state) {
      axios
        .get("/api/v1/users/notifications?page=" + page)
        .then((res) => {
          setNotifications(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [page]);

  const handlePrevPage = () => {
    let willBe = page - 1;
    if (willBe <= 0) {
      return;
    }
    setPage(page - 1);
  };

  const handleNextPage = () => {
    let willBe = page + 1;
    if (willBe > maxPage) {
      return;
    }
    setPage(page + 1);
  };

  const handleMarkAllRead = (e) => {
    e.preventDefault();
    let condition = notifications.filter((n) => !n.read).length > 0;
    condition &&
      axios
        .post("/api/v1/users/notification/read")
        .then((res) => window.location.reload())
        .catch((e) => console.log(e));
  };

  const handleClickNotification = (e, notification) => {
    e.preventDefault();
    if (notification.read) {
      notification.redirectUrl && navigate(notification.redirectUrl);
    } else {
      axios
        .post("/api/v1/users/notification/read/" + notification.id)
        .then((res) => {
          let index = notifications.indexOf(notification);
          notifications[index].read = true;
          setNotifications(Array.from(notifications));
          notification.redirectUrl && navigate(notification.redirectUrl);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Header />
      <div className={cx("notification_wrapper")}>
        <div className={cx("notification_container")}>
          <ChatPopup />
          <div className={cx("notification-header")}>
            <div className={cx("title")}>Notifications</div>
            <div className={cx("read")}>
              <button className={cx("read-btn")} onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            </div>
          </div>
          <div className={cx("notifications-content")}>
            {notifications.map((notification, index) => (
              <div
                className={cx("notification")}
                onClick={(e) => handleClickNotification(e, notification)}
              >
                <img
                  src={notification.imageUrl}
                  alt="notify-img"
                  className={cx("notify-img")}
                />
                <div className={cx("notify-info")}>
                  <div className={cx("title-notify")}>{notification.title}</div>
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notifications;
