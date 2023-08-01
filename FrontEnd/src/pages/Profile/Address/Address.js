import classNames from "classnames/bind";
import {NavLink, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import Header from "~/layouts/components/Header/Header";
import Footer from "~/layouts/components/Footer";
import AddressPopup from "~/layouts/components/AddressPopup";
import styles from "./Address.module.scss";
import {UserContext} from "~/userContext/Context";
import axios from "axios";

const cx = classNames.bind(styles);
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

function Address() {
    const {pathname} = useLocation();
    const [infoReceive, setInfoReceive] = useState(false)
    const [openMadal, setOpenModal] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [defaultId, setDefaultId] = useState();
    const [deleteId, setDeleteId] = useState();
    const [receiveinfos, setReceiveInfos] = useState([]);
    const [user, setUser] = useState({
        email: "",
        firstname: "",
        lastname: "",
        imageurl: "",
        gender: "",
        receiveInfoPage: 1,
    });
    const UC = useContext((UserContext))
    const context = UC.state

    useEffect(() => {
        if (infoReceive) {
            axios
                .get("/api/v1/users/info/receives?page=" + curPage)
                .then((res) => {
                    let setup = res.data || [];
                    let param = curPage === 1 ? "" : "?page=" + curPage;
                    setReceiveInfos(setup);
                })
                .catch((e) => {
                    console.log(e);
                });
            setOpenModal(false)
        }
    }, [infoReceive]);

    useEffect(() => {
        document.title = "Bird Trading Platform | Hot Deals, Best Prices";
    }, []);

    useEffect(() => {
        if (context) {
            setUser(context);
        }
    }, [context]);

    useEffect(() => {
        axios
            .get("/api/v1/users/info/receives?page=" + curPage)
            .then((res) => {
                let setup = res.data || [];
                let param = curPage === 1 ? "" : "?page=" + curPage;
                setReceiveInfos(setup);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [curPage]);

    useEffect(() => {
        if (defaultId) {
            axios
                .post("/api/v1/users/info/receives/default/" + defaultId)
                .then((res) => {
                    console.log(res);
                    window.location.href = "/user/account/address";
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [defaultId]);

    useEffect(() => {
        if (deleteId) {
            axios
                .delete("/api/v1/users/info/receives/delete/" + deleteId)
                .then((res) => {
                    console.log(res);
                    window.location.href = "/user/account/address";
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [deleteId]);

    const handleAdd = () => {
        setOpenModal(true);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setCurPage((c) => {
            if (c > 0) {
                let prevPage = c - 1;
                return prevPage;
            }
            return c;
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setCurPage((c) => {
            if (c < user.receiveInfoPage) {
                let nextPage = c + 1;
                return nextPage;
            }
        });
    };

    const handleSetDefault = (e, id) => {
        e.preventDefault();
        setDefaultId(id);
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        setDeleteId(id);
    };

    return (
        <>
            {openMadal && <AddressPopup closeModel={setOpenModal} receiveInfoChange={setInfoReceive}/>}
            <Header/>
            <div className={cx("profile-wrapper")}>
                <div className={cx("profile-container")}>
                    <div className={cx("profile-content")}>
                        <div className={cx("left-content")}>
                            <div className={cx("user-avatar")}>
                                <div className={cx("user-avatar-img")}>
                                    <img src={user.imageurl} alt="avatar"/>
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
                                        to={data.path}
                                        className={({isActive}) =>
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
                                        key={index}
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
                                    <p>Address Settings</p>
                                </div>
                                <button className={cx("add-new")} onClick={handleAdd}>
                                    <i className={cx("fa-solid fa-plus")}></i>
                                    <span>Add address</span>
                                </button>
                            </div>
                            <div className={cx("setting-content")}>
                                {receiveinfos.map((item) => (
                                    <div className={cx("address-item")} key={item.id}>
                                        <div className={cx("address-icon")}>
                                            <i className={cx("fa-solid fa-address-book")}></i>
                                        </div>
                                        <div className={cx("address-name")}>
                                            <span className={cx("name")}>{item.fullname}</span>
                                        </div>
                                        <div className={cx("address-phone")}>
                                            <span className={cx("phone")}>{item.phone}</span>
                                        </div>
                                        <div className={cx("address-detail")}>
                                            <div className={cx("address-name")}>
                        <span className={cx("address")}>
                          {`${item.specific_address}, ${item.ward.name}, ${item.district.name}, ${item.province.name}`}
                        </span>
                                            </div>
                                            <div className={cx("address-crud")}>
                                                {!item._default && (
                                                    <button
                                                        className={cx("crud-delete")}
                                                        onClick={(e) => handleDelete(e, item.id)}
                                                    >
                                                        <i
                                                            className={cx(
                                                                "icon-delete",
                                                                "fa-sharp fa-solid fa-trash-xmark"
                                                            )}
                                                        ></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx("address-options")}>
                                            <div
                                                className={cx(
                                                    {"address-non-default": !item._default},
                                                    {"address-default": item._default}
                                                )}
                                            >
                                                <span>{item._default && "Default"}</span>
                                            </div>
                                            <button
                                                className={cx("address-make")}
                                                disabled={item._default}
                                                onClick={(e) => handleSetDefault(e, item.id)}
                                            >
                                                <span>Make it default</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className={cx("next-page")}>
                                    <button
                                        className={cx("icon-left")}
                                        onClick={handlePrev}
                                        disabled={curPage === 1}
                                    >
                                        <i className={cx("fa-light fa-angle-left")}></i>
                                    </button>
                                    <button
                                        className={cx("icon-right")}
                                        onClick={handleNext}
                                        disabled={curPage === user.receiveInfoPage}
                                    >
                                        <i className={cx("fa-light fa-angle-right")}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Address;
