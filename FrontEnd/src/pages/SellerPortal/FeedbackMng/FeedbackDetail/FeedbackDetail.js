import classNames from "classnames/bind";
import { useRef, useState } from "react";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import Reply from "./Reply";

import styles from "./FeedbackDetail.module.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

function FeedbackDetail() {
  const { state } = useLocation();
  const [feedback, setFeedback] = useState(() => (state ? state : {}));
  const videoRef = useRef();
  const videoRefPreview = useRef();
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [isPause, setIsPause] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [videoDuration, setVideoDuration] = useState("00:00");
  const [openReply, setOpenReply] = useState(false);
  const onLoadedMetadata = () => {
    let duration =
      videoRef.current.duration && Math.floor(videoRef.current.duration);
    let rs = "00:00";
    if (duration) {
      let minute = Math.floor(duration / 60);
      let seconds = duration % 60;
      let secString = "";
      if (seconds < 10) secString = "0" + seconds;
      else secString = seconds;
      rs = minute + ":" + secString;
    }
    setVideoDuration(rs);
  };

  const handlePause = (e) => {
    setIsPause(true);
  };

  const handlePlay = (e) => {
    setIsPause(false);
  };

  const handleEnded = (e) => {
    setIsPause(false);
    setIsReload(true);
  };

  const handleReplay = (e) => {
    setIsReload(false);
    videoRefPreview.current.currentTime = 0;
    videoRefPreview.current.play();
  };

  const handleClickIcon = (e) => {
    videoRefPreview.current.play();
  };

  const handleOpenReply = () => {
    setOpenReply(true);
  };

  const handleAcceptRefund = (e, fId) => {
    e.preventDefault();
    axios
      .post("/api/v1/shop/feedbacks/accept/" + fId)
      .then((res) => (window.location.href = "/seller/portal/feedback/"))
      .catch((e) => console.log(e));
  };

  return (
    <>
      {openReply && <Reply setOpenReply={setOpenReply} feedback={feedback} />}
      <HeaderSeller title="Feedback Detail" path="/seller/portal/feedback" />
      <div className={cx("feedback-detail_wrapper")}>
        <div className={cx("feedback-detail_sidebar")}>
          <SideBar />
        </div>
        <div className={cx("feedback-detail_container")}>
          <div className={cx("feedback-detail-content")}>
            <div className={cx("feedback-header")}>
              <div className={cx("product-information")}>
                Product Information
              </div>
              <div className={cx("user-feedback")}>Customer Ratings</div>
            </div>
            <div className={cx("feedback-body")}>
              <div className={cx("product-information-body")}>
                <img
                  src={feedback.productImage}
                  alt="product-img"
                  className={cx("product-img")}
                />
                <div className={cx("product-content")}>
                  <div className={cx("name")}>{feedback.productName}</div>
                  <div className={cx("price")}>${feedback.productPrice}</div>
                </div>
              </div>
              <div className={cx("user-feedback-body")}>
                <div className={cx("content")}>
                  <div className={cx("text")}>{feedback.description}</div>
                </div>
                <div className={cx("list-media")}>
                  {feedback.videoUrl && (
                    <div
                      className={
                        videoPreview ? cx("video-active") : cx("video")
                      }
                    >
                      <video
                        ref={videoRef}
                        src={feedback.videoUrl}
                        type="video/mp4"
                        className={cx("video-main")}
                        onClick={(e) => {
                          setVideoPreview((p) => {
                            if (p) {
                              return "";
                            }
                            return e.target.src;
                          });
                          setImagePreview("");
                        }}
                        onLoadedMetadata={onLoadedMetadata}
                      />
                      <div className={cx("icon-video")}>
                        <i className={cx("fa-solid fa-video")}></i>
                        <span>{videoDuration}</span>
                      </div>
                    </div>
                  )}
                  {feedback.images.map((img, index) => (
                    <div
                      key={index}
                      className={
                        imagePreview.id === index
                          ? cx("image-active")
                          : cx("image")
                      }
                      style={{
                        backgroundImage: `url(${img.url})`,
                      }}
                      onClick={() => {
                        setImagePreview((p) => {
                          if (p.id === index) {
                            return "";
                          }
                          return {
                            id: index,
                            src: img.url,
                          };
                        });
                        setVideoPreview("");
                      }}
                    ></div>
                  ))}
                </div>

                {imagePreview && (
                  <div className={cx("media-preview")}>
                    <img
                      src={imagePreview.src}
                      alt="img-preview"
                      className={cx("img-preview")}
                    />
                  </div>
                )}
                {videoPreview && (
                  <div className={cx("media-preview")}>
                    <video
                      src={videoPreview}
                      ref={videoRefPreview}
                      controls
                      onPause={handlePause}
                      onPlay={handlePlay}
                      onEnded={handleEnded}
                      autoPlay
                      className={cx("video-preview")}
                    />

                    {isPause && (
                      <svg
                        enableBackground="new 0 0 15 15"
                        viewBox="0 0 15 15"
                        x="0"
                        y="0"
                        className={cx("svg-icon")}
                        onClick={handleClickIcon}
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
                    )}

                    {isReload && (
                      <svg
                        enableBackground="new 0 0 15 15"
                        viewBox="0 0 15 15"
                        x="0"
                        y="0"
                        className={cx("svg-icon")}
                        onClick={handleReplay}
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
                          clipRule="evenodd"
                          d="m10.2 5.3c.5.7.8 1.4.8 2.2 0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5v.5c-1.6 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.7-.2-1.3-.6-1.8-.1-.1-.1-.1-.1-.1-.1-.1-.1-.3 0-.4s.3-.1.4.1c0-.1 0 0 0 0z"
                          fill="#ffffff"
                          fillRule="evenodd"
                        ></path>
                        <path
                          clipRule="evenodd"
                          d="m7.5 2.9c0-.1.1-.1.1-.1l1.4 1.5-1.4 1.4c0 .1-.1.1-.1 0z"
                          fill="#ffffff"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {feedback.type.startsWith("REPORT") ? (
                <>
                  <div className={cx("accept")}>
                    <button
                      className={cx("accept-btn")}
                      onClick={(e) => handleAcceptRefund(e, feedback.id)}
                    >
                      Accept
                    </button>
                  </div>
                  <div className={cx("reject")}>
                    <button
                      className={cx("reject-btn")}
                      onClick={(e) => handleAcceptRefund(e, feedback.id)}
                    >
                      Reject
                    </button>
                  </div>
                </>
              ) : (
                <div className={cx("reply")}>
                  <button className={cx("reply-btn")} onClick={handleOpenReply}>
                    Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackDetail;
