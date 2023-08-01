import classNames from "classnames/bind";
import {useNavigate} from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import {Wrapper as PopperWrapper} from "~/components/Popper";
import styles from "./NotificationsDropdown.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";

const cx = classNames.bind(styles);


function NotificationsDropdown() {
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/v1/users/notifications?page=1')
            .then(res => {
                setNotifications(res.data)
            })
            .catch(e => console.log(e))
    }, [])

    const handleClickNotification = (e, notification) => {
        e.preventDefault()
        if (notification.read) {
            notification.redirectUrl && navigate(notification.redirectUrl)
        } else {
            axios.post('/api/v1/users/notification/read/' + notification.id)
                .then(res => {
                    let index = notifications.indexOf(notification)
                    notifications[index].read = true;
                    setNotifications(Array.from(notifications))
                    notification.redirectUrl && navigate(notification.redirectUrl)
                })
                .catch(e => console.log(e))
        }
    }

    const handleViewAll = e => {
        e.preventDefault()
        navigate('/user/notification', {
            state: notifications
        })
    }

    return (
        <div className={cx("notify-icon")}>
            {notifications.filter(n => !n.read).length > 0 && (
                <div className={cx("count-notify")}>{notifications.filter(n => !n.read).length}</div>
            )}
            <div>
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
                                            Recently received notifications
                                        </div>
                                        <div className={cx("notify-container")}>
                                            {notifications.slice(0, 6).map((notification, index) => (
                                                <div className={cx("notify-content")} key={index}
                                                     onClick={e => handleClickNotification(e, notification)}>
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
                                            <a className={cx("view-all")} onClick={handleViewAll}>
                                                View All
                                            </a>
                                        </div>
                                    </PopperWrapper>
                                )}
                            </div>
                        )}
                    >
                        <i className={cx("icon", "fa-light fa-bell")}></i>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default NotificationsDropdown;
