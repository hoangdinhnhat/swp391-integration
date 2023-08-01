import classNames from "classnames/bind";
import {useEffect, useRef, useState} from "react";
import styles from "./ProductImage.module.scss";

const cx = classNames.bind(styles);

function ProductImage({previewImage, previewVideo, quantitySoldout}) {
    const [imgPreview, setImgPreview] = useState();
    const [videoPreview, setVideoPreview] = useState("");
    const videoRef = useRef();

    useEffect(() => {
        setImgPreview(previewImage[0])
        setVideoPreview("")
    }, [previewImage[0]])

    return (
        <>
            <div className={cx("product-img")}>
                {videoPreview && (
                    <video
                        src={videoPreview}
                        ref={videoRef}
                        type="video/mp4"
                        className={cx("main-video")}
                        autoPlay={!(quantitySoldout === 0)}
                        controls={!(quantitySoldout === 0)}
                        muted="muted"
                        hidden={!videoPreview}
                    />
                )}
                {imgPreview && (
                    <div
                        className={cx("main_img")}
                        style={{
                            backgroundImage: `url(${imgPreview})`,
                        }}
                    >
                        {quantitySoldout === 0 && (
                            <div className={cx("sold-out")}>Sold out</div>
                        )}
                    </div>
                )}

                <div className={cx("product_img-list")}>
                    <>
                        {previewVideo && (
                            <div className={cx("video")}>
                                <video
                                    src={previewVideo}
                                    type="video/mp4"
                                    className={
                                        videoPreview === previewVideo
                                            ? cx("video-desc-hover")
                                            : cx("video-desc")
                                    }
                                    onMouseEnter={(e) => {
                                        setVideoPreview(e.target.src);
                                        setImgPreview("");
                                    }}
                                />
                                <svg
                                    enablbackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className={cx("svg-icon")}
                                >
                                    <g opacity=".54">
                                        <g>
                                            <circle cx="7.5" cy="7.5" fill="#040000" r="7.3"></circle>
                                            <path
                                                d="m7.5.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z"
                                                fill="#ffffff"
                                            ></path>
                                        </g>
                                    </g>
                                    <path
                                        d="m6.1 5.1c0-.2.1-.3.3-.2l3.3 2.3c.2.1.2.3 0 .4l-3.3 2.4c-.2.1-.3.1-.3-.2z"
                                        fill="#ffffff"
                                    ></path>
                                </svg>
                            </div>
                        )}

                        {previewImage.map((imageURL, index) => (
                            <div
                                className={
                                    imgPreview === imageURL
                                        ? cx("img-desc-hover")
                                        : cx("img-desc")
                                }
                                style={{
                                    backgroundImage: `url(${imageURL})`,
                                }}
                                key={index}
                                onMouseEnter={() => {
                                    setImgPreview(imageURL);
                                    setVideoPreview("");
                                }}
                            ></div>
                        ))}
                    </>
                </div>
            </div>
        </>
    );
}

export default ProductImage;
