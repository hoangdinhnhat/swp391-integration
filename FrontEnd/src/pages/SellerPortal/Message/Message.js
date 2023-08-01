import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import HeaderSeller from "~/layouts/components/HeaderSeller";
import ContentMessage from "./ContentMessage";
import styles from "./Message.module.scss";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import axios from "axios";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

var stompClient = null;

function Message() {
  const { state } = useLocation();
  const [inputSend, setInputSend] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputImageRef = useRef();
  const fileInputVideoRef = useRef();
  const textInputRef = useRef();
  const [shop, setShop] = useState({});
  const [mediaMessages, setMediaMessages] = useState([]);

  useEffect(() => {
    document.title = "Seller Centre";
  }, []);

  useEffect(() => {
    if (state) {
      let userId = state;
      let savedId;
      conversations.forEach((c, id) => {
        let found = c.conversationChatters
          .filter((cc) => !cc.shop)
          .find((cc) => cc.user.id === userId);

        if (found) savedId = id;
      });

      if (savedId) setActiveTab(savedId);
      else {
        axios
          .get("/api/v1/users/info")
          .then((res) => {
            if (res.data.shopDTO) {
              if (!stompClient) {
                let Sock = new SockJS("http://localhost:8080/ws");
                stompClient = over(Sock);
                stompClient.connect(
                  {},
                  () => conRequest(res.data.shopDTO.id, userId),
                  (e) => console.log(e)
                );
              }else conRequest(res.data.shopDTO.id, userId)
            }
          })
          .catch((e) => {
            console.log(e);
          });

        const conRequest = (shopId, userId) => {
          const request = {
            fromId: shopId,
            toId: userId,
            content: "Let's Start",
            sendTime: new Date(),
            chatterType: "SHOP",
          };
          stompClient.send(
            "/app/conversation-request",
            {},
            JSON.stringify(request)
          );
        };
      }
    }
  }, [state]);

  useEffect(() => {
    axios
      .get("/api/v1/users/info")
      .then((res) => {
        if (res.data.shopDTO) {
          for (const key in res.data.shopDTO) {
            shop[key] = res.data.shopDTO[key];
          }
          setShop(shop);

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
    setShop({ ...shop, connected: true });
    stompClient.subscribe("/personal/SHOP-" + shop.id, onMessageReceived);
    stompClient.subscribe(
      "/conversation-request/" + shop.id,
      onNewConversation
    );
    userJoin();
  };

  const userJoin = () => {
    let request = {
      fromId: shop.id,
      sendTime: new Date(),
      chatterType: "SHOP",
    };

    stompClient.send("/app/personal", {}, JSON.stringify(request));
  };

  const onNewConversation = (payload) => {
    const data = JSON.parse(payload.body);
    data.messages = data.messages || [];
    console.log(data);
    stompClient.subscribe("/conversation/" + data.id, onPrivateMessage);
    if (!conversations.find((it) => it.id === data.id)) {
      conversations.push(data);
      setConversations(Array.from(conversations));
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
      setConversations(Array.from(conversations.reverse()));
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
        fromId: shop.id,
        content: inputSend,
        sendTime: new Date(),
        conversationId: conversations[activeTab].id,
        chatterType: "SHOP",
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

  const handleCall = () => {
    alert("This feature will be update in the future");
  };

  const handleClickImage = () => {
    fileInputImageRef.current.click();
  };

  const handlePreviewImage = (e) => {
    let length = e.target.files.length;
    for (let i = 0; i < length; i++) {
      let mediaMsg = {
        type: "IMG",
        file: e.target.files[i],
      };
      mediaMessages.push(mediaMsg);
      setMediaMessages(Array.from(mediaMessages));
    }
  };

  const handleClickVideo = () => {
    fileInputVideoRef.current.click();
  };

  const handlePreviewVideo = (e) => {
    let length = e.target.files.length;
    for (let i = 0; i < length; i++) {
      let mediaMsg = {
        type: "VIDEO",
        file: e.target.files[i],
      };
      mediaMessages.push(mediaMsg);
      setMediaMessages(Array.from(mediaMessages));
    }
  };

  const handleClickEmoji = () => {
    setShowEmoji((val) => !val);
  };

  const onEmojiClick = (e) => {
    setInputSend((pre) => pre + e.emoji);
    textInputRef.current.focus();
    setShowEmoji(false);
  };

  return (
    <>
      <HeaderSeller title="Message" />
      <div className={cx("order_wrapper")}>
        <div className={cx("order_container")}>
          <div className={cx("order_content")}>
            <div className={cx("content-left")}>
              <div className={cx("header")}>
                <span className={cx("heading")}>Chat</span>
              </div>
              <div className={cx("search-container")}>
                <div className={cx("search")}>
                  <i
                    className={cx(
                      "fa-light fa-magnifying-glass",
                      "search-icon"
                    )}
                  ></i>
                  <input
                    type="text"
                    placeholder="Search..."
                    spellCheck={false}
                    className={cx("input-search")}
                  />
                </div>
              </div>
              <div className={cx("list-container")}>
                {conversations.map((con, index) => {
                  let len = con.messages.length;
                  return con.conversationChatters
                    .filter((it) => {
                      return !it.shop;
                    })
                    .map((it, itIndex) => (
                      <div
                        key={index}
                        className={cx("user-chat", {
                          active: index === activeTab,
                        })}
                        onClick={() => setActiveTab(index)}
                      >
                        <img
                          src={"/api/v1/publics/user/avatar/" + it.user.email}
                          alt="avatar"
                          className={cx("user-avatar")}
                        />
                        <div className={cx("user-content")}>
                          <div className={cx("above")}>
                            <div className={cx("user-name")}>
                              {it.user.firstname + " " + it.user.lastname}
                            </div>
                            <div className={cx("date")}>
                              {new Date(
                                con.messages[len - 1].sendTime
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className={cx("under")}>
                            <div className={cx("content-chat")}>
                              {con.messages[len - 1].content}
                            </div>
                            <div className={cx("time")}>
                              {new Date(
                                con.messages[len - 1].sendTime
                              ).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ));
                })}
              </div>
            </div>
            <div className={cx("content-right")}>
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
              <div className={cx("chat-header")}>
                <div className={cx("header-left")}>
                  <img
                    src={
                      conversations[activeTab] &&
                      conversations[activeTab].conversationChatters
                        .filter((it) => !it.shop)
                        .map(
                          (it) => "/api/v1/publics/user/avatar/" + it.user.email
                        )[0]
                    }
                    alt="avatar"
                    className={cx("avatar")}
                  />
                  <span className={cx("name")}>
                    {conversations[activeTab] &&
                      conversations[activeTab].conversationChatters
                        .filter((it) => !it.shop)
                        .map(
                          (it) => it.user.firstname + " " + it.user.lastname
                        )[0]}
                  </span>
                </div>
                <div className={cx("header-right")}>
                  <button className={cx("phone-btn")} onClick={handleCall}>
                    <i
                      className={cx("fa-sharp fa-solid fa-phone", "phone")}
                    ></i>
                  </button>
                  <button className={cx("video-btn")} onClick={handleCall}>
                    <i className={cx("fa-solid fa-video", "video")}></i>
                  </button>
                </div>
              </div>
              <div className={cx("chat-container")}>
                <ContentMessage
                  messages={
                    conversations[activeTab] &&
                    [...conversations[activeTab].messages].reverse()
                  }
                  shop={shop}
                />
              </div>
              <div className={cx("chat-footer")}>
                <div className={cx("option-input")}>
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
                      accept="image/*"
                      onChange={handlePreviewImage}
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
                      accept="video/*"
                      onChange={handlePreviewVideo}
                    />
                  </div>
                </div>
                <div className={cx("input-container")}>
                  {mediaMessages.length > 0 && (
                    <div className={cx("list-preview-image")}>
                      {mediaMessages.map((media, index) => {
                        if (media.type === "IMG") {
                          return (
                            <div
                              className={cx("load-image-preview")}
                              key={index}
                            >
                              <img
                                src={URL.createObjectURL(media.file)}
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
                          <div className={cx("load-video-preview")} key={index}>
                            <video
                              src={URL.createObjectURL(media.file)}
                              type="video/mp4"
                              className={cx("video-preview")}
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

                  <div
                    className={cx("text-input", {
                      active: mediaMessages.length > 0,
                    })}
                  >
                    <input
                      ref={textInputRef}
                      type="text"
                      placeholder="Aa"
                      spellCheck={false}
                      autoFocus
                      value={inputSend}
                      onChange={(e) => setInputSend(e.target.value)}
                      className={cx("input-chat")}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          sendPrivateValue(e);
                        }
                      }}
                    />

                    <div className={cx("emoji")}>
                      <i
                        className={cx("fa-regular fa-face-smile", "icon-emoji")}
                        onClick={handleClickEmoji}
                      ></i>
                    </div>
                  </div>
                </div>

                <div className={cx("send-chat")} onClick={sendPrivateValue}>
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

export default Message;
