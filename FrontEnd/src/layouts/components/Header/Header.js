import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import avatar from "~/assets/images/user.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import styles from "./Header.module.scss";
import { UserContext } from "~/App";
import axios from "axios";
const cx = classNames.bind(styles);

const Header = () => {
  const user = useContext(UserContext);
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    if (logout) {
      axios
        .post("/api/v1/auths/signout")
        .then((res) => {
          console.log(res);
          window.location.href = "/";
        })
        .catch((e) => console.log(e));
    }
  }, [logout]);

  const handleLogout = (e) => {
    e.preventDefault();
    setLogout(true);
  };

  return (
    <>
      <div className={cx("header")}>
        <div className={cx("header-content")}>
          <Link to="/" className={cx("logo-link")}>
            <p className={cx("text")}>
              <span className={cx("sub-text")}>B</span>ird
              <span className={cx("inner-subText")}>
                <span className={cx("sub-text")}>T</span>rading
              </span>
            </p>
          </Link>
          <div className={cx("search-container")}>
            <form action="" className={cx("search-bar")}>
              <input
                type="text"
                placeholder="Search your product from here"
              ></input>
              <button type="submit">
                <i className={cx("fa-regular fa-magnifying-glass")}></i>
              </button>
            </form>
          </div>
          <div className={cx("options-content")}>
            <div className={cx("option")}>
              <Link className={cx("option-link")} to="/shop">
                Products
              </Link>
            </div>
            <div className={cx("option")}>
              <Link className={cx("option-link")} to="/about">
                About Us
              </Link>
            </div>
            <div className={cx("option")}>
              <Link className={cx("option-link")} to="/contact">
                Contact Us
              </Link>
            </div>
          </div>
          <div className={cx("cart-icon")}>
            <span className={cx("counter", "disable")}>22</span>
            <Link to="/cart" className={cx("cart-link")}>
              <i className={cx("icon", "fa-light fa-cart-shopping")}></i>
            </Link>
          </div>

          <div className={cx("notification-icon")}>
            <Link to="/user/notifications" className={cx("notify-link")}>
              <i className={cx("icon", "fa-light fa-bell")}></i>
            </Link>
          </div>

          <div className={cx("nav-icon")}>
            {/* -----------------Da login----------------- */}
            {user ? (
              <Tippy
                interactive
                delay={[0, 200]}
                placement="bottom-end"
                render={(attrs) => (
                  <div
                    className={cx("user-login-options")}
                    tabIndex="-1"
                    {...attrs}
                  >
                    <PopperWrapper>
                      <div className={cx("option-first", "option-user")}>
                        <Link
                          to="/user/account/profile"
                          className={cx("login-link")}
                        >
                          <span>My account</span>
                          <i className={cx("icon-sub", "fa-light fa-user")}></i>
                        </Link>
                      </div>
                      <div className={cx("option-next")}>
                        <Link to="/" className={cx("login-link")}>
                          <span>My purchase</span>
                          <i
                            className={cx(
                              "icon-sub",
                              "fa-sharp fa-regular fa-basket-shopping"
                            )}
                          ></i>
                        </Link>
                      </div>
                      <div className={cx("option-next")}>
                        <Link to="/" className={cx("login-link")}>
                          <span>Seller</span>
                          <i
                            className={cx("icon-sub", "fa-light fa-circle-dollar")}
                          ></i>
                        </Link>
                      </div>
                      <div className={cx("option-logout")}>
                        <a className={cx("signup-link")} onClick={handleLogout}>
                          <span>Log out</span>
                          <i
                            className={cx(
                              "icon-sub",
                              "fa-regular fa-power-off"
                            )}
                          ></i>
                        </a>
                      </div>
                    </PopperWrapper>
                  </div>
                )}
              >
                <div className={cx("user-avatar")}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      alt="avatar"
                      src={user.imageurl}
                      sx={{ width: 33, height: 33 }}
                    />
                  </Stack>
                </div>
              </Tippy>
            ) : (
              <Tippy
                interactive
                delay={[0, 200]}
                placement="bottom-end"
                render={(attrs) => (
                  <div className={cx("user-options")} tabIndex="-1" {...attrs}>
                    {/* -----------------Chua login----------------- */}
                    <PopperWrapper>
                      <div className={cx("option-first")}>
                        <Link to="/login" className={cx("login-link")}>
                          <span>Login</span>
                          <i
                            className={cx(
                              "icon-sub",
                              "fa-regular fa-right-to-bracket"
                            )}
                          ></i>
                        </Link>
                      </div>
                      <div className={cx("option-signup")}>
                        <Link to="/signup" className={cx("signup-link")}>
                          <span>Sign up</span>
                          <i
                            className={cx(
                              "icon-sub",
                              "fa-regular fa-user-plus"
                            )}
                          ></i>
                        </Link>
                      </div>
                    </PopperWrapper>
                  </div>
                )}
              >
                <div className={cx("user-avatar")}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      alt="avatar"
                      src={avatar}
                      sx={{ width: 33, height: 33 }}
                    />
                  </Stack>
                </div>
              </Tippy>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
