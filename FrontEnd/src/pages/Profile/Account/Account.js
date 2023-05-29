import classNames from "classnames/bind";

import Avatar from "react-avatar-edit";
import { useState, useEffect, useContext } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

import styles from "./Account.module.scss";
import Header from "~/layouts/components/Header/Header";
import Footer from "~/layouts/components/Footer";
import { UserContext } from "~/App";

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

const sidebarDatas = [
  {
    title: "Account",
    icon: "fa-light fa-user",
    path: "/user/account/profile",
  },
  {
    title: "Password",
    icon: "fa-light fa-lock",
    path: "/user/account/password",
  },
  {
    title: "Address",
    icon: "fa-regular fa-address-book",
    path: "/user/account/address",
  },
];

function Profile() {
  const { pathname } = useLocation();
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const context = useContext(UserContext)
  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    gender: "",
    imageurl: "",
  });

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (pv) => {
    setPreview(pv);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 10485760) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  useEffect(() => {
    if (context) {
      setUser(context);
    }
  }, [context]);

  useEffect(() => {
    if (changeAvatar) {
      const formData = new FormData();
      fetch(preview)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "mail.png");
          formData.append("file", file);
          axios
            .post("/api/v1/users/info/avatar", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              // context.imageurl = context.imageurl + "?" + new Date().getTime();
              window.location.href = "/user/account/profile"
              setChangeAvatar(c => !c)
            })
            .catch((e) => {
              setChangeAvatar(c => !c)
            });
        });
    }
  }, [changeAvatar]);

  useEffect(() => {
    if (updateProfile) {
      let updateRequest = {
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender
      }
      axios.post('/api/v1/users/info/update/profile', updateRequest)
      .then(res => {
        window.location.href = "/user/account/profile"
      })
      .catch(e => {
      })
    }
  }, [updateProfile]);

  const handleConfirmAvatar = (e) => {
    e.preventDefault();
    setChangeAvatar(true);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUpdateProfile(true)
  }

  return (
    <>
      <Header />
      <div className={cx("profile-wrapper")}>
        <div className={cx("profile-container")}>
          <div className={cx("profile-content")}>
            <div className={cx("left-content")}>
              <div className={cx("user-avatar")}>
                <div className={cx("user-avatar-img")}>
                  <img src={user.imageurl} alt="avatar" />
                </div>
                <div className={cx("user-name")}>
                  <p>
                    {(user.firstname + " " + user.lastname).trim() || "User"}
                  </p>
                </div>
              </div>
              <div className={cx("user-nav")}>
                {sidebarDatas.map((data, index) => (
                  <NavLink
                    key={index}
                    to={data.path}
                    className={({ isActive }) =>
                      [cx("nav-link"), isActive ? cx("nav-active") : null].join(
                        " "
                      )
                    }
                    isActive={() =>                                     
                      [
                        "/user/account/profile",
                        "/user/account/password",
                        "/user/account/address",
                      ].includes(pathname)
                    } 
                  >
                    <i className={cx(data.icon, "icon-sidebar")}></i>
                    <span className={cx("nav-text")}>{data.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className={cx("right-content")}>
              <div className={cx("right-content-head")}>
                <div className={cx("setting-title")}>
                  <p>Account Settings</p>
                </div>
              </div>
              <form>
                <div className={cx("setting-container")}>
                  <div className={cx("setting-content_left")}>
                    <div className={cx("text", "text-1")}>
                      <input
                        type="text"
                        className={cx("email")}
                        required
                        value={user.firstname}
                        onChange={(e) =>
                          setUser({ ...user, firstname: e.target.value })
                        }
                      />
                      <span></span>
                      <label>First name</label>
                    </div>
                    <div className={cx("text", "text-2")}>
                      <input
                        type="text"
                        className={cx("email")}
                        required
                        value={user.lastname}
                        onChange={(e) =>
                          setUser({ ...user, lastname: e.target.value })
                        }
                      />
                      <span></span>
                      <label>Last name</label>
                    </div>
                    <div className={cx("gender-form")}>
                      <p>Gender</p>
                      <div className={cx("gender")}>
                        {genders.map((gender) => (
                          <label key={gender.id}>
                            <input
                              type="radio"
                              checked={(() => {
                                let gender_name = user.gender;
                                if (!gender_name) return false;
                                let gender_object = genders.filter(
                                  (g) => g.name.toUpperCase() === gender_name
                                )[0];
                                console.log(gender_object, gender_name);
                                return gender_object.id === gender.id;
                              })()}
                              onChange={() => {
                                let gender_object = genders.filter(
                                  (g) => g.id === gender.id
                                )[0];
                                setUser({
                                  ...user,
                                  gender: gender_object.name.toUpperCase(),
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
                        <Alert key="success" variant="success">
                          Successfully updated
                        </Alert>
                      </div>
                    )}
                    <div className={cx("save")}>
                      <button className={cx("save-btn")} onClick={handleUpdateProfile}>Save</button>
                    </div>
                  </div>
                  <div className={cx("setting-content_right")}>
                    <div className={cx("drop-image")}>
                      <div className={cx("drop-icon")}>
                        <i
                          className={cx("fa-regular fa-file-image", "icon")}
                        ></i>
                      </div>
                      <Avatar
                        width={350}
                        height={350}
                        onCrop={onCrop}
                        onClose={onClose}
                        onBeforeFileLoad={onBeforeFileLoad}
                        src={null}
                        label="Click here to change image"
                      />
                      <div className={cx("drop-text")}>
                        <span>{preview ? "" : "(Maximum size 10 MB)"}</span>
                      </div>
                    </div>
                    <div className={cx("submit-avatar")}>
                      <button
                        className={cx("avatar-btn")}
                        onClick={handleConfirmAvatar}
                        disabled={preview ? false : true}
                      >
                        Change avatar
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
