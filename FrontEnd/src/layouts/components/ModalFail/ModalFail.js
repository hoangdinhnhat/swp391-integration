import classNames from "classnames/bind";
import styles from "./ModalFail.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import fail from "~/assets/images/fail.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const cx = classNames.bind(styles);

function ModalFail({
  closeModal,
  message = "Message",
  subMessage = "Sub message",
  path = "/",
  contentBtn = "OKAY",
  isResend = true,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resend, setResend] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [msg, setMsg] = useState("");
  const [resendMsg, setResendMsg] = useState("");

  const imgStyles = {
    width: "40px",
    height: "40px",
    backgroundImage: `url(${fail})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
  };

  useEffect(() => {
    if (resend) {
      let token = searchParams.get("token");
      axios
        .get("/api/v1/auths/registration/resend?token=" + token)
        .then((res) => {
          setMsg((msg) => res.data.status);
          setAlertType("success");
          setResend(false);
        })
        .catch((e) => {
          setMsg(e.response.data.message);
          setAlertType("danger");
          setResend(false);
        });
    }
  }, [resend]);

  const handleResend = (e) => {
    e.preventDefault();
    setResend(true);
  };

  return (
    <div className={cx("overlay")}>
      <div onClick={(e) => e.stopPropagation()} className={cx("pop-up")}>
        <div className={cx("heading")}>
          <div className={cx("img-success")} style={imgStyles}></div>
          <div className={cx("fail-heading")}>
            <h1 className={cx("fail")}>{message}</h1>
          </div>
        </div>
        <div className={cx("fail-text")}>
          <p>{subMessage}</p>
        </div>
        {msg && (
          <div className={cx("error")}>
            <Alert key={alertType} variant={alertType}>
              {msg}
            </Alert>
          </div>
        )}
        <div className={cx("navigate")}>
          {!isResend ? (
            <Link className={cx("navigate-link")} to={path}>
              {isResend ? "RESEND EMAIL" : contentBtn}
            </Link>
          ) : (
            <a className={cx("navigate-link")} onClick={handleResend}>
              {"Resend"}
            </a>
          )}
        </div>
        <div className={cx("success-text")}>
          <p>{resendMsg}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalFail;
