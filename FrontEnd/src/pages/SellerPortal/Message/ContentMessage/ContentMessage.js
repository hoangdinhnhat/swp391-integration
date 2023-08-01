import classNames from "classnames/bind";
import styles from "./ContentMessage.module.scss";

const cx = classNames.bind(styles);

function ContentMessage({ messages, shop }) {
  return (
    <>
      {messages &&
        messages.map((msg, index) => {
          let isShow = false;
          if (messages[index - 1]) {
            let sendTime = new Date(messages[index - 1].sendTime);
            sendTime.setMinutes(sendTime.getMinutes() + 10);
            let curSendTime = new Date(msg.sendTime);
            if (curSendTime > sendTime) {
              isShow = true;
            }
          }

          if (msg.senderId !== shop.id || msg.senderType !== "SHOP") {
            switch (msg.type) {
              case "TEXT":
                return (
                  <div className={cx("message-container-receive")} key={index}>
                    {isShow && (
                      <div className={cx("message-date-time-receive")}>
                        {new Date(msg.sendTime).toLocaleString()}
                      </div>
                    )}
                    <div className={cx("message-info-receive")}>
                      <div className={cx("message-content-receive")}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              case "IMAGES":
                return (
                  <div className={cx("message-container-receive")} key={index}>
                    {isShow && (
                      <div className={cx("message-date-time-receive")}>
                        {new Date(msg.sendTime).toLocaleString()}
                      </div>
                    )}
                    <div className={cx("message-info-receive")}>
                      <div className={cx("message-content-receive")}>
                        {msg.images.map((img, index) => {
                          let percent = 100 / msg.images.length;
                          if (msg.images.length > 3) {
                            percent = 100 / 3;
                          }
                          return (
                            <img
                              style={{ width: `${percent}%` }}
                              src={img.url}
                              alt="img"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              case "VIDEOS":
                return (
                  <div className={cx("message-container-receive")} key={index}>
                    {isShow && (
                      <div className={cx("message-date-time-receive")}>
                        {new Date(msg.sendTime).toLocaleString()}
                      </div>
                    )}
                    <div className={cx("message-info-receive")}>
                      <div className={cx("message-content-receive")}>
                        <video controls src={msg.video} />
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          }

          switch (msg.type) {
            case "TEXT":
              return (
                <div className={cx("message-container-self")} key={index}>
                  {isShow && (
                    <div className={cx("message-date-time-self")}>
                      {new Date(msg.sendTime).toLocaleString()}
                    </div>
                  )}
                  <div className={cx("message-info-self")}>
                    <div className={cx("message-content-self")}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            case "IMAGES":
              return (
                <div className={cx("message-container-self")} key={index}>
                  {isShow && (
                    <div className={cx("message-date-time-self")}>
                      {new Date(msg.sendTime).toLocaleString()}
                    </div>
                  )}
                  <div className={cx("message-info-self")}>
                    <div className={cx("message-content-self")}>
                      {msg.images.map((img, index) => {
                        let percent = 100 / msg.images.length;
                        if (msg.images.length > 3) {
                          percent = 100 / 3;
                        }
                        return (
                          <img
                            style={{ width: `${percent}%` }}
                            src={img.url}
                            alt="img"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            case "VIDEO":
              return (
                <div className={cx("message-container-self")} key={index}>
                  {isShow && (
                    <div className={cx("message-date-time-self")}>
                      {new Date(msg.sendTime).toLocaleString()}
                    </div>
                  )}
                  <div className={cx("message-info-self")}>
                    <div className={cx("message-content-self")}>
                      <video controls src={msg.video} />
                    </div>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
    </>
  );
}

export default ContentMessage;
