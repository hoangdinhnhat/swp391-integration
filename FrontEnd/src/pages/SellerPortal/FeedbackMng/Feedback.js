import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import StarRating from "~/layouts/components/StarRating";
import { UserContext } from "~/userContext/Context";

import styles from "./Feedback.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

const filterStar = [
  {
    title: "All",
  },
  {
    title: "5 Star",
    value: 5,
  },
  {
    title: "4 Star",
    value: 4,
  },
  {
    title: "3 Star",
    value: 3,
  },
  {
    title: "2 Star",
    value: 2,
  },
  {
    title: "1 Star",
    value: 1,
  },
];

function FeedBack() {
  const UC = useContext(UserContext);
  const context = UC.state;
  const [shop, setShop] = useState({});
  const [titleFilter, setTitleFilter] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [allFeedback, setAllFeedback] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const navigate = useNavigate();

  const ceil = (num) => {
    let rounded = Math.round(num);
    if (rounded < num) {
      rounded += 1;
    }
    return rounded;
  };

  const calculateMaxPage = (length) => {
    let div = (length * 1.0) / 5;
    return ceil(div);
  };

  useEffect(() => {
    let url = "/api/v1/shop/feedbacks/max-feedback";
    if (filterStar[titleFilter].value) {
      url += "&rate=" + filterStar[titleFilter].value;
    }

    axios
      .get(url)
      .then((res) => {
        setMaxPage(calculateMaxPage(res.data));
        setAllFeedback(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    let url = "/api/v1/shop/feedbacks?page=" + page;
    if (filterStar[titleFilter].value) {
      url += "&rate=" + filterStar[titleFilter].value;
    }

    axios
      .get(url)
      .then((res) => setFeedbacks(res.data))
      .catch((e) => console.log(e));
  }, [page, titleFilter]);

  useEffect(() => {
    if (context && context.shopDTO) {
      setShop(context.shopDTO);
    }
  }, [context]);

  const handleDetail = (e, feedback) => {
    e.preventDefault();
    navigate("detail", {
      state: feedback,
    });
  };

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

  const handleChat = (e, userId) => {
    e.preventDefault();
    navigate("/seller/portal/message", { state: userId });
  };

  useEffect(() => {
    document.title = "Seller Centre";
  }, []);
  return (
    <>
      <HeaderSeller title="Feedback" />
      <div className={cx("feedback_wrapper")}>
        <div className={cx("feedback_sidebar")}>
          <SideBar />
        </div>
        <div className={cx("feedback_container")}>
          <div className={cx("feedback-content")}>
            <div className={cx("feedback-header")}>
              <div className={cx("title")}>Shop Ratings</div>
              <div className={cx("rating-overall")}>
                {shop.rating} <span className={cx("overall")}>/ 5</span>
              </div>
            </div>
            <div className={cx("feedback-details")}>
              <div className={cx("feedback-statistic")}>
                <div className={cx("count-feedback")}>
                  {allFeedback} Feedback
                </div>
                <Tippy
                  interactive
                  delay={[0, 100]}
                  placement="bottom-end"
                  render={(attrs) => (
                    <div
                      className={cx("filter-options")}
                      tabIndex="-1"
                      {...attrs}
                    >
                      <PopperWrapper>
                        {filterStar.map((filter, index) => (
                          <div
                            className={cx("option")}
                            key={index}
                            onClick={() => setTitleFilter(index)}
                          >
                            {filter.title}
                          </div>
                        ))}
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <div className={cx("filter-feedback")}>
                    <span
                      className={
                        titleFilter === 0
                          ? cx("filter-title")
                          : cx("filter-title-active")
                      }
                    >
                      {filterStar[titleFilter].title}
                    </span>
                    <i
                      className={cx(
                        "fa-sharp fa-light fa-chevron-down",
                        "down-icon"
                      )}
                    ></i>
                  </div>
                </Tippy>
              </div>
              <div className={cx("header-table")}>
                <div className={cx("user-information-head")}>
                  User Information
                </div>
                <div className={cx("feedback-information-head")}>
                  Feedback Information
                </div>
              </div>

              {feedbacks.map((feedback, index) => (
                <div className={cx("body-content")} key={index}>
                  <div className={cx("user-information-body")}>
                    <img
                      src={feedback.userImageUrl}
                      alt="avatar"
                      className={cx("user-avatar")}
                    />
                    <div className={cx("user-info")}>
                      <div className={cx("user-content")}>
                        <div className={cx("user-name")}>
                          {feedback.userName}
                        </div>
                        <div className={cx("feedback-date")}>
                          {feedback.data}
                        </div>
                      </div>
                      <div className={cx("user-rating")}>
                        <StarRating
                          rating={feedback.rate}
                          font={1.3}
                          color={`var(--primary)`}
                        />
                      </div>
                      <div className={cx("chat")}>
                        <button
                          className={cx("chat-btn")}
                          onClick={(e) => handleChat(e, feedback.userId)}
                        >
                          <i
                            className={cx("fa-solid fa-messages", "icon-chat")}
                          ></i>
                          <span className={cx("chat-text")}>Chat</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={cx("feedback-information-body")}>
                    <div className={cx("feedback-type")}>
                      <span className={cx("type-title")}>
                        Type of feedback:{" "}
                      </span>
                      <span className={cx("type-content")}>
                        {feedback.type == "REPORT"
                          ? feedback.type + " - " + feedback.description
                          : feedback.type}
                      </span>
                    </div>
                    <span className={cx("feedback-data")}>
                      {feedback.description}
                    </span>
                  </div>
                  <div className={cx("see-detail-body")}>
                    <a
                      className={cx("forward-detail")}
                      onClick={(e) => handleDetail(e, feedback)}
                    >
                      Detail
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className={cx("prev-next")}>
              <button
                className={cx("icon-left")}
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                <i className={cx("fa-light fa-angle-left")}></i>
              </button>
              <button
                className={cx("icon-right")}
                onClick={handleNextPage}
                disabled={page === maxPage}
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

export default FeedBack;
