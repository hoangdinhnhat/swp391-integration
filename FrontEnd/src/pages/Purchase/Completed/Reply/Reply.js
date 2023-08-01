import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/userContext/Context";

import styles from "./Reply.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function Reply({ setOpenReply, order, setChanged }) {
  const UC = useContext(UserContext);
  const context = UC.state;
  const [countTextarea, setCountTextarea] = useState(0);
  const [inputTextarea, setInputTextarea] = useState("");
  const [errorTextarea, setErrorTextarea] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (context) {
      setUser(context);
    }
  }, [context]);

  const handleChangeTestArea = (e) => {
    let tempText = e.target.value;
    setInputTextarea(e.target.value);
    if (tempText === "") {
      setErrorTextarea(
        "Reason could not be empty. Please enter at least 10 characters."
      );
    } else {
      setErrorTextarea("");
    }
    setCountTextarea(e.target.value.length);
  };

  const handleReply = () => {
    if (inputTextarea === "") {
      setErrorTextarea("Reason could not be empty");
    } else if (inputTextarea.length < 10 || inputTextarea.length > 100) {
      setErrorTextarea("Content should have 10 - 100 characters");
    } else {
      let request = {
        reporterId: user.id,
        reasonType: inputTextarea,
        orderId: order.id,
        reasonSpecific: inputTextarea,
      };
      let url = "/api/v1/users/order/report/" + order.id;

      axios
        .post(url, request)
        .then((res) => {
          setOpenReply(false);
          alert("Report Successfully!");
          setChanged(c => !c)
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div className={cx("overlay")}>
      <div className={cx("reply_popup")}>
        <div className={cx("reply-header")}>Send Report</div>
        <div className={cx("reply-container")}>
          <textarea
            placeholder="Reason Content (10-100 character allowed)"
            className={
              errorTextarea ? cx("input-reply-error") : cx("input-reply")
            }
            maxLength={100}
            spellCheck={false}
            onChange={handleChangeTestArea}
          />
          <div className={cx("reply-notify")}>
            <div className={cx("error")}>{errorTextarea}</div>
            <div className={cx("count")}>{countTextarea}/100</div>
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
