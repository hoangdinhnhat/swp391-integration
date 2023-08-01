import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import ImageItem from "../AddProduct/ImageItem";

import styles from "./EditProduct.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function EditProduct({ product, setShowEdit, setChange }) {
  const fileInputImageRef = useRef();
  const fileInputVideoRef = useRef();
  const videoPreview = useRef();
  const [quantityImage, setQuantityImage] = useState(product.images.length);
  const [listImageEdit, setListImageEdit] = useState(product.images);
  const [video, setVideo] = useState(product.video);
  const [videoDuration, setVideoDuration] = useState("00:00");
  const [showDeleteVideo, setShowDeleteVideo] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [countInput, setCountInput] = useState(product.name.length);
  const [inputNameProduct, setInputNameProduct] = useState(product.name);
  const [inputNameProductError, setInputNameProductError] = useState("");
  const [price, setPrice] = useState(product.price);
  const [priceError, setPriceError] = useState("");
  const [quantity, setQuantity] = useState(product.available);
  const [quantityError, setQuantityError] = useState("");
  const [countTextarea, setCountTextarea] = useState(
    product.description.length
  );
  const [inputTextarea, setInputTextarea] = useState(product.description);
  const [errorTextarea, setErrorTextarea] = useState("");
  const [videoObj, setVideoObj] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    return () => {
      listImageEdit && URL.revokeObjectURL(listImageEdit.preview);
    };
  }, [listImageEdit]);

  useEffect(() => {
    if (inputNameProduct) {
      if (inputNameProduct.length < 10) {
        setInputNameProductError(
          "Your product name is too short. Please enter at least 10 characters."
        );
      } else {
        setInputNameProductError("");
      }
    }
  }, [inputNameProduct]);

  useEffect(() => {
    if (price) {
      if (price < 1) {
        setPriceError("Value must be at least 1$");
      } else if (price > 100000) {
        setPriceError("The price has exceeded the maximum value of $100,000");
      } else {
        setPriceError("");
      }
    }
  }, [price]);

  useEffect(() => {
    if (quantity) {
      if (quantity < 1) {
        setQuantityError("Quantity must be at least 1");
      } else if (quantity > 1000000) {
        setQuantityError(
          "The number must be greater than 0 and less than 1000000."
        );
      } else {
        setQuantityError("");
      }
    }
  }, [quantity]);

  useEffect(() => {
    if (inputTextarea) {
      if (inputTextarea.length < 100) {
        setErrorTextarea(
          "Your product description is too short. Please enter at least 100 characters."
        );
      } else {
        setErrorTextarea("");
      }
    }
  }, [inputTextarea]);

  const handleClickImage = () => {
    fileInputImageRef.current.click();
  };

  const handleClickVideo = () => {
    fileInputVideoRef.current.click();
  };

  const handlePreviewImage = (e) => {
    const length = e.target.files.length;
    const files = [];
    const previews = [];

    for (let i = 0; i < length; i++) {
      const file = e.target.files[i];
      files.push(file);
      let url = URL.createObjectURL(file);
      let img = {
        url: url,
      };
      previews.push(img);
    }

    setImages((prev) => [...prev, ...files]);
    setListImageEdit((prev) => [...prev, ...previews]);
    setQuantityImage((pre) => pre + length);
  };

  const handlePreviewVideo = (e) => {
    const file = e.target.files[0];
    const fileSize = e.target.files[0].size;
    const maxSizeInBytes = 31457280;
    if (file) {
      if (fileSize > maxSizeInBytes) {
        setVideoError(
          "This file is too large to be previewed (less than 30MB)"
        );
      } else {
        file.preview = URL.createObjectURL(file);
        setVideo(file.preview);
        setVideoObj(file);
        setVideoError("");
      }
    }
  };

  const onLoadedMetadata = () => {
    let duration =
      videoPreview.current.duration &&
      Math.floor(videoPreview.current.duration);
    let rs = "00:00";
    if (duration) {
      let minute = Math.floor(duration / 60);
      let seconds = duration % 60;
      let secString = "";
      if (seconds < 10) secString = "0" + seconds;
      else secString = seconds;
      rs = minute + ":" + secString;
    }
    setVideoDuration(rs);
  };

  const handleChangeInputProductName = (e) => {
    let tempName = e.target.value;
    console.log(tempName);
    setInputNameProduct(e.target.value);
    if (tempName === "") {
      setInputNameProductError("Can't not be empty");
    }
    setCountInput(e.target.value.length);
  };

  const handleChangePrice = (e) => {
    let tempPrice = e.target.value;
    setPrice(e.target.value);
    if (tempPrice === "") {
      setPriceError("Can't be empty");
    } else {
      setPriceError("");
    }
  };

  const handleChangeQuantity = (e) => {
    let tempQuantity = e.target.value;
    setQuantity(e.target.value);
    if (tempQuantity === "") {
      setQuantityError("Can't be empty");
    } else {
      setQuantityError("");
    }
  };

  const handleChangeTextarea = (e) => {
    let tempText = e.target.value;
    setInputTextarea(e.target.value);
    if (tempText === "") {
      setErrorTextarea(
        "Your product description is too short. Please enter at least 100 characters."
      );
    }
    setCountTextarea(e.target.value.length);
  };

  const handleEditProduct = () => {
    let request = {
      name: inputNameProduct,
      description: inputTextarea,
      price: price,
      available: quantity,
    };

    const formData = new FormData();
    videoObj && formData.append("video", videoObj);
    images.forEach((item) => {
      formData.append("images", item);
    });

    formData.append("product", JSON.stringify(request));
    formData.append("productId", product.id)

    axios
      .post("/api/v1/shop/products/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setShowEdit(false)
        setChange(c => !c)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("edit_popup")}>
        <div className={cx("edit-header")}>Edit Product</div>
        <div className={cx("edit-container")}>
          <div className={cx("edit-image")}>
            <div className={cx("title")}>Product Images</div>
            <div className={cx("list-image")}>
              <div className={cx("required-image")}>
                <span className={cx("required")}>* </span>Scale image 1:1
              </div>
              <div className={cx("image-action")}>
                {listImageEdit.map((image, index) => (
                  <ImageItem
                    key={index}
                    image={image.url}
                    index={index}
                    setListImage={setListImageEdit}
                    setQuantityImage={setQuantityImage}
                  />
                ))}

                {listImageEdit.length < 4 && (
                  <div className={cx("image-selected")}>
                    <div className={cx("selected")} onClick={handleClickImage}>
                      <div className={cx("selected-icon")}>
                        <i
                          className={cx("fa-regular fa-image", "image-icon")}
                        ></i>
                        <i className={cx("fa-solid fa-plus", "plus-icon")}></i>
                      </div>
                      <div className={cx("selected-text")}>
                        Add images ({quantityImage}/4)
                      </div>
                    </div>
                    <input
                      ref={fileInputImageRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className={cx("image-input")}
                      style={{ display: "none" }}
                      onChange={handlePreviewImage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={cx("edit-video")}>
            <div className={cx("title")}>Product Video</div>
            <div className={cx("video-content")}>
              <div className={cx("video-main")}>
                <div className={cx("video-action")}>
                  {video ? (
                    <div
                      className={cx("video-view")}
                      onMouseEnter={() => setShowDeleteVideo(true)}
                      onMouseLeave={() => setShowDeleteVideo(false)}
                    >
                      <video
                        ref={videoPreview}
                        src={video}
                        className={cx("video")}
                        onLoadedMetadata={onLoadedMetadata}
                      />
                      {showDeleteVideo ? (
                        <div className={cx("action")}>
                          <i
                            className={cx(
                              "fa-regular fa-trash-can",
                              "delete-icon"
                            )}
                            onClick={() => setVideo("")}
                          ></i>
                        </div>
                      ) : (
                        <div className={cx("duration")}>{videoDuration}</div>
                      )}
                    </div>
                  ) : (
                    <div className={cx("video-selected")}>
                      <div
                        className={cx("selected")}
                        onClick={handleClickVideo}
                      >
                        <div className={cx("selected-icon")}>
                          <i
                            className={cx(
                              "fa-light fa-video-plus",
                              "video-icon"
                            )}
                          ></i>
                        </div>
                        <div className={cx("selected-text")}>Add video</div>
                      </div>
                      <input
                        ref={fileInputVideoRef}
                        type="file"
                        accept="video/*"
                        multiple
                        className={cx("video-input")}
                        style={{ display: "none" }}
                        onChange={handlePreviewVideo}
                      />
                    </div>
                  )}
                </div>
                <div className={cx("video-requirements")}>
                  <ul className={cx("list-requirements")}>
                    <li className={cx("item-requirements")}>
                      Size: Up to 30Mb
                    </li>
                    <li className={cx("item-requirements")}>Format: MP4</li>
                  </ul>
                </div>
              </div>
              {videoError && (
                <div className={cx("video-error")}>{videoError}</div>
              )}
            </div>
          </div>
          <div className={cx("edit-product-name")}>
            <div className={cx("content")}>
              <div className={cx("title")}>
                <span className={cx("required")}>* </span>Product name
              </div>
              <div className={cx("name-input")}>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={inputNameProduct}
                  className={
                    inputNameProductError ? cx("input-error") : cx("input")
                  }
                  maxLength={120}
                  onChange={handleChangeInputProductName}
                />
                <div className={cx("count-input")}>
                  <div className={cx("count-number")}>{countInput}/120</div>
                </div>
              </div>
            </div>
            {inputNameProductError && (
              <div className={cx("product-name-error")}>
                {inputNameProductError}
              </div>
            )}
          </div>

          <div className={cx("edit-group")}>
            <div className={cx("edit-quantity")}>
              <div className={cx("quantity-main")}>
                <div className={cx("title")}>
                  <span className={cx("required")}>* </span>Quantity
                </div>
                <div className={cx("quantity-content")}>
                  <input
                    type="number"
                    value={quantity}
                    className={
                      quantityError
                        ? cx("quantity-input-error")
                        : cx("quantity-input")
                    }
                    placeholder="Enter quantity"
                    onChange={handleChangeQuantity}
                  />
                </div>
              </div>
              {quantityError && (
                <div className={cx("quantity-error")}>{quantityError}</div>
              )}
            </div>
          </div>
          <div className={cx("edit-price")}>
            <div className={cx("price-main")}>
              <div className={cx("title")}>
                <span className={cx("required")}>* </span>Price
              </div>
              <div className={cx("price-content")}>
                <input
                  type="number"
                  value={price}
                  className={
                    priceError ? cx("input-price-error") : cx("input-price")
                  }
                  placeholder="Enter price"
                  onChange={handleChangePrice}
                />
              </div>
            </div>
            {priceError && (
              <div className={cx("price-error")}>{priceError}</div>
            )}
          </div>

          <div className={cx("edit-description")}>
            <div className={cx("title")}>
              <span className={cx("required")}>* </span>Description
            </div>
            <div className={cx("description-input")}>
              <textarea
                className={errorTextarea ? cx("input-error") : cx("input")}
                value={inputTextarea}
                maxLength={3000}
                spellCheck={false}
                onChange={handleChangeTextarea}
              />
              <div className={cx("input-notify")}>
                <div className={cx("error-textarea")}>{errorTextarea}</div>
                <div className={cx("count-textarea")}>{countTextarea}/3000</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("edit-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </button>
          <button className={cx("save-btn")} onClick={handleEditProduct}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
