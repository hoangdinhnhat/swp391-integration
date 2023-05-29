import classNames from "classnames/bind";
import { useState } from "react";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "react-bootstrap/Alert";
import styles from "./Forget.module.scss";

const cx = classNames.bind(styles);

function Forget({onClick, errMsg = "" , loading}) {

  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    onClick(e, {email})
  }

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <form>
            <div className={cx("head-text")}>
              <p>Forget Password</p>
            </div>
            <div className={cx("header-subText")}>
              <p>
                <span className={cx("sub-error")}>Opps!!!</span> Something
                happen with your account. Input your email address to fix the
                issue.
              </p>
            </div>
            <div className={cx("info")}>
              <div className={cx("text")}>
                <input type="text" className={cx("email")} onChange={e => setEmail(e.target.value)} required />
                <span></span>
                <label>Email</label>
              </div>
              {errMsg && (
                <div className={cx('error')}>
                  <Alert key="danger" variant="danger">
                    {errMsg}
                  </Alert>
                </div>
              )}
              <div className={cx("btn-submit")}>
                <button onClick={handleSubmit} disabled={email === ''}>SUBMIT</button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default (Forget);
