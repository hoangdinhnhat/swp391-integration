import * as React from "react";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import EmailPopup from "~/layouts/components/EmailPopup";
import Footer from "~/layouts/components/Footer";
import HeaderForm from "~/layouts/components/HeaderForm";
import styles from "./Signup.module.scss";

const cx = classNames.bind(styles);

const genders = [
  {
    id: 1,
    name: "Male",
  },
  {
    id: 2,
    name: "Female",
  },
  {
    id: 3,
    name: "Other",
  },
];

function Signup() {
  const [user, setUser] = useState({
    firstname: undefined,
    lastname: undefined,
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checked, setChecked] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmType, setPasswordConfirmType] = useState("password");

  useEffect(() => {
    document.title = "Sign up today! | Bird Trading Platform";
  }, []);

  useEffect(() => {
    if (submit) {
      axios
        .post("/api/v1/auths/registration", user)
        .then((res) => {
          console.log(res);
          setOpenModal(true);
          setOpen(false);
        })
        .catch((e) => {
          console.log(e.response.data.message);
          setMsg(e.response.data.message);
          setSubmit(false);
          setOpen(false);
        });
    }
  }, [submit, user]);

  useEffect(() => {
    if (
      user.firstname &&
      user.lastname &&
      user.email &&
      user.password &&
      confirm &&
      checked &&
      user.password === confirm
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    user.firstname,
    user.lastname,
    user.email,
    user.password,
    confirm,
    checked,
  ]);

  useEffect(() => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    if (typeof user.firstname === "string" && !user.firstname) {
      setDisabled(true);
      setMsg("Firstname is required!");
    } else if (typeof user.lastname === "string" && !user.lastname) {
      setDisabled(true);
      setMsg("Lastname is required!");
    } else if (user.email && !regex.test(user.email)) {
      setDisabled(true);
      setMsg("Email not valid!");
    } else if (user.password && confirm && user.password !== confirm) {
      setDisabled(true);
      setMsg("Passwords do not match!");
    } else setMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm, user.email, user.firstname, user.lastname]);

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const togglePasswordConfirm = (e) => {
    e.preventDefault();
    if (passwordConfirmType === "password") {
      setPasswordConfirmType("text");
      return;
    }
    setPasswordConfirmType("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {openModal && (
        <EmailPopup
          setOpenModal
          email={user.email}
          message="Register successfully"
          subMessage="to verify"
        />
      )}
      <HeaderForm text="Register" />
      {!openModal && (
        <>
          <div className={cx("container")}>
            <div className={cx("content")}>
              <form>
                <div className={cx("head-text")}>
                  <p>Register</p>
                </div>
                <div className={cx("info")}>
                  <div className={cx("text-content")}>
                    <div className={cx("text", "text-1")}>
                      <input
                        type="text"
                        className={cx("first-name")}
                        onBlur={(e) =>
                          setUser({ ...user, firstname: e.target.value.trim() })
                        }
                        required
                      />
                      <span></span>
                      <label>First name</label>
                    </div>
                    <div className={cx("text", "text-2")}>
                      <input
                        type="text"
                        className={cx("last-name")}
                        onBlur={(e) =>
                          setUser({ ...user, lastname: e.target.value.trim() })
                        }
                        required
                      />
                      <span></span>
                      <label>Last name</label>
                    </div>
                  </div>
                  <div className={cx("text")}>
                    <input
                      type="text"
                      className={cx("email")}
                      onBlur={(e) =>
                        setUser({ ...user, email: e.target.value.trim() })
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
                      onBlur={(e) => {
                        setUser({ ...user, password: e.target.value.trim() });
                      }}
                      required
                    />
                    <div className={cx("input-group-btn")}>
                      <button
                        className={cx("eyes-btn")}
                        onClick={togglePassword}
                      >
                        {passwordType === "password" ? (
                          <i
                            className={cx("icon-password", "bi bi-eye-slash")}
                          ></i>
                        ) : (
                          <i className={cx("icon-password", "bi bi-eye")}></i>
                        )}
                      </button>
                    </div>
                    <span></span>
                    <label>Password</label>
                  </div>

                  <div className={cx("text")}>
                    <input
                      type={passwordConfirmType}
                      className={cx("confirm-password")}
                      onBlur={(e) => setConfirm(e.target.value.trim())}
                      required
                    />
                    <div className={cx("input-group-btn")}>
                      <button
                        className={cx("eyes-btn")}
                        onClick={togglePasswordConfirm}
                      >
                        {passwordConfirmType === "password" ? (
                          <i
                            className={cx("icon-password", "bi bi-eye-slash")}
                          ></i>
                        ) : (
                          <i className={cx("icon-password", "bi bi-eye")}></i>
                        )}
                      </button>
                    </div>
                    <span></span>
                    <label>Confirm password</label>
                  </div>
                  <div className={cx("gender-form")}>
                    <p>Gender</p>
                    <div className={cx("gender")}>
                      {genders.map((gender) => (
                        <label key={gender.id}>
                          <input
                            type="radio"
                            checked={checked === gender.id}
                            onChange={() => {
                              setChecked(gender.id);
                              setUser({
                                ...user,
                                gender: gender.name.toUpperCase(),
                              });
                            }}
                          />
                          <i></i>
                          <span>{gender.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {msg && (
                    <div className={cx("error")}>
                      <Alert key="danger" variant="danger">
                        {msg}
                      </Alert>
                    </div>
                  )}
                  <div className={cx("btn-submit")}>
                    <button onClick={handleSubmit} disabled={disabled}>
                      SIGN UP
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
                  <div className={cx("login")}>
                    <p>
                      Already have an account?{" "}
                      <span>
                        <Link to="/login">Log in</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Signup;
