import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

import Report from "~/pages/Product/Report";
import Message from "./Message";
import styles from "./ChatWindow.module.scss";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const cx = classNames.bind(styles);

var stompClient = null;

function ChatWindow({ closeChat, color }) {
  const [showOptions, setShowOptions] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [inputSend, setInputSend] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const fileInputImageRef = useRef();
  const fileInputVideoRef = useRef();
  const textInputRef = useRef();
  const [user, setUser] = useState({});
  const [mediaMessages, setMediaMessages] = useState([]);
  const [reportShopId, setReportShopId] = useState();

  useEffect(() => {
    axios
      .get("/api/v1/users/info")
      .then((res) => {
        if (res.data) {
          for (const key in res.data) {
            user[key] = res.data[key];
          }
          setUser(user);

          let Sock = new SockJS("http://localhost:8080/ws");
          stompClient = over(Sock);
          stompClient.connect({}, onConnected, onError);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConnected = () => {
    setUser({ ...user, connected: true });
    stompClient.subscribe("/personal/USER-" + user.id, onMessageReceived);
    stompClient.subscribe(
      "/conversation-request/" + user.id,
      onNewConversation
    );
    userJoin();
  };

  const userJoin = () => {
    let request = {
      fromId: user.id,
      sendTime: new Date(),
      chatterType: "USER",
    };

    stompClient.send("/app/personal", {}, JSON.stringify(request));
  };

  const onNewConversation = (payload) => {
    const data = JSON.parse(payload.body);
    data.messages = data.messages || [];
    stompClient.subscribe("/conversation/" + data.id, onPrivateMessage);
    if (!conversations.find((it) => it.id === data.id)) {
      conversations.push(data);
      setConversations(Array.from(conversations.reverse()));
    }
  };

  const onMessageReceived = (payload) => {
    var data = JSON.parse(payload.body);
    console.log(data);
    data.forEach((item, index) => {
      stompClient.subscribe("/conversation/" + item.id, onPrivateMessage);
      if (!conversations.find((it) => it.id === item.id)) {
        conversations.push(item);
      }
      setConversations(Array.from(conversations));
    });
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    let conversation = conversations.filter(
      (it) => it.id === payloadData.conId
    )[0];
    console.log(conversation);
    let index = conversations.indexOf(conversation);
    if (!conversations[index].messages.find((it) => it.id === payloadData.id)) {
      conversations[index].messages.push(payloadData);
      setConversations([...conversations]);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const sendPrivateValue = (e) => {
    e.preventDefault();
    if (stompClient) {
      var chatMessage = {
        fromId: user.id,
        content: inputSend,
        sendTime: new Date(),
        conversationId: conversations[activeTab].id,
        chatterType: "USER",
      };

      const formData = new FormData();
      mediaMessages.forEach((media, index) => {
        if (media.type === "IMG") {
          formData.append("images", media.file);
        } else {
          formData.append("videos", media.file);
        }
      });

      formData.append("message", JSON.stringify(chatMessage));

      axios
        .post("/app/media-message", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setInputSend("");
          textInputRef.current.focus();
          setMediaMessages([]);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setShowOptions(false);
    });
  }, []);

  const handleClickImage = () => {
    fileInputImageRef.current.click();
  };

  const handleClickVideo = () => {
    fileInputVideoRef.current.click();
  };

  const handleClickEmoji = () => {
    setShowEmoji((val) => !val);
  };

  const onEmojiClick = (e) => {
    setInputSend((pre) => pre + e.emoji);
    textInputRef.current.focus();
    setShowEmoji(false);
  };

  const handleChangeVideo = (e) => {
    let length = e.target.files.length;
    for (let i = 0; i < length; i++) {
      let mediaMsg = {
        type: "VIDEO",
        file: e.target.files[i],
        url: URL.createObjectURL(e.target.files[i]),
      };
      mediaMessages.push(mediaMsg);
      setMediaMessages(Array.from(mediaMessages));
    }
  };

  const handleChangeImage = (e) => {
    let length = e.target.files.length;
    for (let i = 0; i < length; i++) {
      let mediaMsg = {
        type: "IMG",
        file: e.target.files[i],
        url: URL.createObjectURL(e.target.files[i]),
      };
      mediaMessages.push(mediaMsg);
      setMediaMessages(Array.from(mediaMessages));
    }
  };

  return (
    <>
      {openReport && <Report closeReport={setOpenReport} type="shop" shop={reportShopId}/>}
      <div className={cx("chat_window")}>
        {showEmoji && (
          <div className={cx("emojiPickerContainer")}>
            <EmojiPicker
              width={300}
              height={350}
              emojiStyle="facebook"
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
        <div className={cx("chat_window-header")}>
          <div className={cx("text")}>Chat</div>
          <button className={cx("close-btn")} onClick={() => closeChat(false)}>
            <i className={cx("fa-light fa-chevron-down", "icon-close")}></i>
          </button>
        </div>
        <div className={cx("chat_window-container")}>
          <div className={cx("chat_side-bar")}>
            <div className={cx("search-bar")}>
              <input
                type="text"
                className={cx("search-input")}
                placeholder="Search..."
              />
            </div>
            <div className={cx("list-chat")}>
              {conversations.map((con, index) => {
                let len = con.messages.length;
                return con.conversationChatters
                  .filter((it) => {
                    return !it.user;
                  })
                  .map((it, itIndex) => (
                    <div
                      key={index}
                      className={cx("shop_chat", {
                        active: index === activeTab,
                      })}
                      onClick={() => setActiveTab(index)}
                    >
                      <img
                        src={it.shop.shopImage}
                        alt="shop-img"
                        className={cx("shop-avatar")}
                      />
                      <div className={cx("shop-info")}>
                        <div className={cx("shop-name")}>{it.shop.name}</div>
                        <div className={cx("message-date")}>
                          {new Date(
                            con.messages[len - 1].sendTime
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ));
              })}
            </div>
          </div>
          <div className={cx("chat_content")}>
            <div className={cx("chat-header")}>
              <div className={cx("shop-info")}>
                <img
                  src={
                    conversations[activeTab] &&
                    conversations[activeTab].conversationChatters
                      .filter((it) => !it.user)
                      .map((it) => it.shop.shopImage)[0]
                  }
                  alt="avatar-shop"
                  className={cx("shop-avatar")}
                />
                <div className={cx("shop-name")}>
                  {conversations[activeTab] &&
                    conversations[activeTab].conversationChatters
                      .filter((it) => !it.user)
                      .map((it) => it.shop.name)[0]}
                </div>
              </div>
              <div className={cx("options")}>
                <button
                  className={cx("dot-btn")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOptions(true);
                  }}
                >
                  <i className={cx("fa-regular fa-ellipsis", "dot-icon")}></i>
                </button>
                {showOptions && (
                  <div className={cx("choices")}>
                    <div className={cx("view-shop")}>
                      <Link
                        to={
                          conversations[activeTab] &&
                          "/shop?shopId=" +
                            conversations[activeTab].conversationChatters
                              .filter((it) => !it.user)
                              .map((it) => it.shop.id)[0]
                        }
                      >
                        View Shop
                      </Link>
                    </div>
                    <div className={cx("report")}>
                      <button
                        onClick={() => {
                          setOpenReport(true);
                          setReportShopId(
                            conversations[activeTab].conversationChatters
                              .filter((it) => !it.user)
                              .map((it) => it.shop.id)[0]
                          );
                        }}
                      >
                        Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={cx("chat-container")}>
              <Message
                messages={
                  conversations[activeTab] &&
                  [...conversations[activeTab].messages].reverse()
                }
                user={user}
              />
            </div>

            <div className={cx("chat-footer")}>
              <div className={cx("input-container")}>
                {mediaMessages.length > 0 && (
                  <div className={cx("list-preview-image")}>
                    {mediaMessages.map((media, index) => {
                      if (media.type === "IMG") {
                        return (
                          <div className={cx("load-image-preview")}>
                            <img
                              src={media.url}
                              alt="img-preview"
                              className={cx("image-preview")}
                            />
                            <div
                              className={cx("close")}
                              onClick={() => {
                                let newMediaMsg = mediaMessages.filter(
                                  (md, i) => i !== index
                                );
                                setMediaMessages(Array.from(newMediaMsg));
                              }}
                            >
                              <i
                                className={cx(
                                  "fa-regular fa-xmark",
                                  "close-icon"
                                )}
                              ></i>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className={cx("load-video-preview")}>
                          <video
                            src={media.url}
                            type="video/mp4"
                            className={cx("video-preview")}
                          />
                          <div
                            className={cx("close")}
                            // onClick={() => {
                            //   let newMediaMsg = mediaMessages.filter(
                            //     (md, i) => i !== index
                            //   );
                            //   setMediaMessages(Array.from(newMediaMsg));
                            // }}
                          >
                            <i
                              className={cx(
                                "fa-regular fa-xmark",
                                "close-icon"
                              )}
                            ></i>
                          </div>
                          <div className={cx("pause")}>
                            <svg
                              enableBackground="new 0 0 15 15"
                              viewBox="0 0 15 15"
                              x="0"
                              y="0"
                              className={cx("svg-icon")}
                            >
                              <g opacity=".54">
                                <g>
                                  <circle
                                    cx="7.5"
                                    cy="7.5"
                                    fill="#040000"
                                    r="7.3"
                                  ></circle>
                                  <path
                                    d="m7.5.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z"
                                    fill="#ffffff"
                                  ></path>
                                </g>
                              </g>
                              <path
                                d="m6.1 5.1c0-.2.1-.3.3-.2l3.3 2.3c.2.1.2.3 0 .4l-3.3 2.4c-.2.1-.3.1-.3-.2z"
                                fill="#ffffff"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className={cx("input-text")}>
                  <textarea
                    ref={textInputRef}
                    placeholder="Enter the text of the message"
                    spellCheck="false"
                    value={inputSend}
                    autoFocus
                    onChange={(e) => setInputSend(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        sendPrivateValue(e);
                      }
                    }}
                  ></textarea>
                </div>
              </div>

              <div className={cx("send-options")}>
                <div className={cx("option-input")}>
                  <div className={cx("emoji")}>
                    <i
                      className={cx("fa-regular fa-face-smile", "icon-emoji")}
                      onClick={handleClickEmoji}
                    ></i>
                  </div>
                  <div className={cx("image")}>
                    <i
                      className={cx("fa-regular fa-image", "icon-image")}
                      onClick={handleClickImage}
                    ></i>
                    <input
                      ref={fileInputImageRef}
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleChangeImage}
                      accept="image/*"
                    />
                  </div>
                  <div className={cx("video")}>
                    <i
                      className={cx(
                        "fa-sharp fa-regular fa-circle-play",
                        "icon-video"
                      )}
                      onClick={handleClickVideo}
                    ></i>
                    <input
                      ref={fileInputVideoRef}
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleChangeVideo}
                      accept="video/*"
                    />
                  </div>
                </div>
                <div className={cx("option-send")} onClick={sendPrivateValue}>
                  <i
                    className={
                      inputSend
                        ? cx(
                            "fa-regular fa-paper-plane-top",
                            "icon-send-active"
                          )
                        : cx("fa-regular fa-paper-plane-top", "icon-send")
                    }
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatWindow;
