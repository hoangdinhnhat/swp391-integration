import classNames from "classnames/bind";
import {useState} from "react";

import styles from "./Reply.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function Reply({setOpenReply, feedback}) {
    const [countTextarea, setCountTextarea] = useState(0);
    const [inputTextarea, setInputTextarea] = useState("");
    const [errorTextarea, setErrorTextarea] = useState("");
    const handleChangeTestArea = (e) => {
        let tempText = e.target.value;
        setInputTextarea(e.target.value);
        if (tempText === "") {
            setErrorTextarea(
                "Reply could not be empty. Please enter at least 10 characters."
            );
        } else {
            setErrorTextarea("");
        }
        setCountTextarea(e.target.value.length);
    };

    const handleReply = () => {
        if (inputTextarea === "") {
            setErrorTextarea("Reply could not be empty");
        } else if (inputTextarea.length < 10 || inputTextarea.length > 300) {
            setErrorTextarea("Reply content should have 10 - 30 characters");
        } else {
            let request = {
                feedbackId: feedback.id,
                response: inputTextarea
            }
            axios.post("/api/v1/shop/feedbacks/response/", request)
                .then(res => window.location.href = "/seller/portal/feedback")
                .catch(e => console.log(e))
        }
    };
    return (
        <div className={cx("overlay")}>
            <div className={cx("reply_popup")}>
                <div className={cx("reply-header")}>Reply</div>
                <div className={cx("reply-container")}>
          <textarea
              placeholder="Reply Content (10-300 character allowed)"
              className={
                  errorTextarea ? cx("input-reply-error") : cx("input-reply")
              }
              maxLength={300}
              spellCheck={false}
              onChange={handleChangeTestArea}
          />
                    <div className={cx("reply-notify")}>
                        <div className={cx("error")}>{errorTextarea}</div>
                        <div className={cx("count")}>{countTextarea}/300</div>
                    </div>
                </div>
                <div className={cx("reply-footer")}>
                    <button
                        className={cx("cancel-btn")}
                        onClick={() => setOpenReply(false)}
                    >
                        Cancel
                    </button>
                    <button className={cx("reply-btn")} onClick={handleReply}>
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Reply;
