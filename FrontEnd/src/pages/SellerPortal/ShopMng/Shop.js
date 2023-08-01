import classNames from "classnames/bind";
import {useContext, useEffect, useRef, useState} from "react";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import {UserContext} from "~/userContext/Context";
import styles from "./Shop.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function Shop() {
    const fileInputImageRef = useRef();
    const [countInput, setCountInput] = useState(0);
    const [previewImage, setPreviewImage] = useState({});
    const [imgError, setImgError] = useState("");

    useEffect(() => {
        document.title = "Seller Centre";
    }, []);

    const handleClickImage = () => {
        fileInputImageRef.current.click();
    };
    const UC = useContext(UserContext);
    const context = UC.state;
    const [shop, setShop] = useState({})

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        const fileSize = e.target.files[0].fileSize;
        const maxSize = 2097152;
        if (file) {
            if (fileSize > maxSize) {
                setImgError("This file is too large to be previewed (less than 2.0MB)");
            } else {
                file.preview = URL.createObjectURL(file);
                setPreviewImage({
                    file: file,
                    url: file.preview
                });
                setImgError("");
            }
        }
    };

    useEffect(() => {
        if (context && context.shopDTO) {
            setShop(context.shopDTO);
            setCountInput(context.shopDTO.name.length)
        }
    }, [context]);

    const handleChangeShopInfo = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("image", previewImage.file);
        formData.append("name", shop.name);
        formData.append("phone", shop.phone);

        axios
            .post("/api/v1/shop/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            <HeaderSeller title="Shop"/>
            <div className={cx("shop_wrapper")}>
                <div className={cx("shop_sidebar")}>
                    <SideBar/>
                </div>
                <div className={cx("shop_container")}>
                    <div className={cx("shop-content")}>
                        <div className={cx("shop-header")}>
                            <div className={cx("title")}>Shop Profile</div>
                            <div className={cx("subTitle")}>
                                View Shop status and update your Shop profile
                            </div>
                        </div>
                        <div className={cx("main-content")}>
                            <div className={cx("content-text")}>Basic Information</div>
                            <div className={cx("content-shop")}>
                                <div className={cx("shop-name")}>
                                    <div className={cx("name-title")}>Shop name</div>
                                    <div className={cx("name-input")}>
                                        <input
                                            type="text"
                                            spellCheck={false}
                                            maxLength={30}
                                            className={cx("input")}
                                            value={shop.name}
                                            onChange={(e) => {
                                                shop.name = e.target.value
                                                setShop(shop)
                                                setCountInput(e.target.value.length)
                                            }}
                                        />
                                        <div className={cx("count-input")}>{countInput}/30</div>
                                    </div>
                                </div>
                                <div className={cx("shop-phone")}>
                                    <div className={cx("phone-title")}>Shop phone</div>
                                    <div className={cx("phone-input")}>
                                        <input
                                            type="number"
                                            spellCheck={false}
                                            value={shop.phone}
                                            onChange={e => {
                                                shop.phone = e.target.value
                                                setShop(shop)
                                            }}
                                            className={cx("input")}
                                        />
                                    </div>
                                </div>
                                <div className={cx("shop-logo")}>
                                    <div className={cx("logo-title")}>Shop logo</div>
                                    <div className={cx("logo-content")}>
                                        <div className={cx("logo-main")}>
                                            <div className={cx("logo-upload")}>
                                                <img
                                                    src={previewImage.url ? previewImage.url : shop.shopImage}
                                                    alt="shop-avatar"
                                                    className={cx("shop-avatar")}
                                                />
                                                <div className={cx("upload")}>
                                                    <i
                                                        className={cx(
                                                            "fa-regular fa-camera-retro",
                                                            "upload-icon"
                                                        )}
                                                        onClick={handleClickImage}
                                                    ></i>
                                                    <input
                                                        ref={fileInputImageRef}
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        className={cx("image-input")}
                                                        style={{display: "none"}}
                                                        onChange={handlePreviewImage}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx("logo-required")}>
                                                <ul className={cx("required-list")}>
                                                    <li className="required">Scale image 1:1</li>
                                                    <li className="required">Maximum file size: 2.0MB</li>
                                                    <li className="required">
                                                        Image format accepted: JPG, JPEG, PNG
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {imgError && (
                                            <div className={cx("logo-error")}>{imgError}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={cx("shop-actions")}>
                                <button className={cx("save-btn")} onClick={handleChangeShopInfo}>Save</button>
                                <button className={cx("cancel-btn")}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
