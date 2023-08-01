import classNames from "classnames/bind";
import * as React from "react";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import Footer from "~/layouts/components/Footer";
import HeaderForm from "~/layouts/components/HeaderForm";
import googleIcon from "~/assets/images/googleIcon.png";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(true);

  const [request, setRequest] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    document.title = "Login now to start shopping! | Bird Trading Platform";
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          axios
            .post("/api/v1/auths/google", res.data)
            .then((res) => {
              setMsg("");
              let redirectUrl = "/";
              if (res.data.role === "ADMIN") {
                redirectUrl = "/admin/portal/dashboard";
              } else if (res.data.role === "SHIPPING_UNIT") {
                redirectUrl = "/shipping-unit";
              }

              window.location.href = redirectUrl;
              console.log(res.data);
            })
            .catch((e) => {
              setMsg(e.response.data.message);
              setSubmit(false);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  useEffect(() => {
    if (submit) {
      axios
        .post("/api/v1/auths/authentication", request)
        .then((res) => {
          setMsg("");
          let redirectUrl = "/";
          if (res.data.role === "ADMIN") {
            redirectUrl = "/admin/portal/dashboard";
          } else if (res.data.role === "SHIPPING_UNIT") {
            redirectUrl = "/shipping-unit";
          }

          window.location.href = redirectUrl;
          console.log(res.data, redirectUrl);
        })
        .catch((e) => {
          setMsg(e.response.data.message);
          setSubmit(false);
          setOpen(false);
        });
    }
  }, [submit, request, navigate]);

  useEffect(() => {
    axios
      .get("/api/v1/users/info")
      .then((res) => {
        navigate("/");
      })
      .catch((e) => {
        setIsLogin(false);
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (request.email && request.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [request.email, request.password]);

  useEffect(() => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (request.email && !regex.test(request.email)) {
      setDisabled(true);
      setMsg("Email not valid!");
    } else {
      setDisabled(false);
      setMsg("");
    }
  }, [request.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    setSubmit(true);
  };

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderForm text="Login" />
      {!isLogin && (
        <div className={cx("container")}>
          <div className={cx("content")}>
            <form>
              <div className={cx("head-text")}>
                <p>Welcome</p>
              </div>
              <div className={cx("info")}>
                <div className={cx("text")}>
                  <input
                    type="text"
                    className={cx("email")}
                    spellCheck={false}
                    onBlur={(e) =>
                      setRequest({ ...request, email: e.target.value.trim() })
                    }
                    required
                  />
                  <span></span>
                  <label>Email</label>
                </div>
                <div className={cx("text")}>
                  <input
                    type={passwordType}
                    className={cx("password")}
                    onChange={(e) =>
                      setRequest({ ...request, password: e.target.value })
                    }
                    required
                  />

                  <div className={cx("input-group-btn")}>
                    <button className={cx("eyes-btn")} onClick={togglePassword}>
                      {passwordType === "password" ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </div>
                  <span></span>
                  <label>Password</label>
                </div>
                {msg && (
                  <Alert key="danger" variant="danger">
                    {msg}
                  </Alert>
                )}
                <div className={cx("options")}>
                  <Link to="/reset" className={cx("options-link")}>
                    Forget password
                  </Link>
                </div>

                <div className={cx("btn-submit")}>
                  <button onClick={handleSubmit} disabled={disabled}>
                    LOG IN
                  </button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                    onClick={handleClose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>

                <div className={cx("or")}>
                  <span></span>
                  <p>or</p>
                  <span></span>
                </div>

                <div className={cx("choices")}>
                  <label className={cx("login-google")}>
                    <div className={cx("icon-google")} onClick={() => login()}>
                      <img src={googleIcon} alt="google"></img>
                    </div>
                  </label>

                  <div className={cx("sign-up")}>
                    <p>
                      Don't have account?{" "}
                      <span>
                        <Link to="/signup">Sign up</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Login;
