import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "../../SideBar";
import ImageItem from "./ImageItem";
import CancelPopup from "./CancelPopup";

import styles from "./AddProduct.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [detailInfos, setDetailInfos] = useState([]);
  const [videoObj, setVideoObj] = useState();
  const [images, setImages] = useState([]);
  const [categoryGroup, setCategoryGroup] = useState({
    id: undefined,
    name: "Select a category group",
  });

  const fileInputImageRef = useRef();
  const fileInputVideoRef = useRef();
  const videoPreview = useRef();
  const [quantityImage, setQuantityImage] = useState(0);
  const [listImage, setListImage] = useState([]);
  const [video, setVideo] = useState("");
  const [videoDuration, setVideoDuration] = useState("00:00");
  const [showDeleteVideo, setShowDeleteVideo] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [countInput, setCountInput] = useState(0);
  const [inputNameProduct, setInputNameProduct] = useState("");
  const [inputNameProductError, setInputNameProductError] = useState("");
  const [category, setCategory] = useState({
    id: undefined,
    name: "Select a category",
  });
  const [countTextarea, setCountTextarea] = useState(0);
  const [inputTextarea, setInputTextarea] = useState("");
  const [errorTextarea, setErrorTextarea] = useState("");
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState("");
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  useEffect(() => {
    document.title = "Seller Centre";
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/publics/category/all")
      .then((res) => setCategories(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (category.id) {
      axios
        .get("/api/v1/publics/category/details/" + category.id)
        .then((res) => {
          setDetailInfos(res.data);
        })
        .catch((e) => console.log(e));

      axios
        .get("/api/v1/publics/category/group/" + category.id)
        .then((res) => {
          setCategoryGroups(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [category.id]);

  useEffect(() => {
    return () => {
      listImage && URL.revokeObjectURL(listImage.preview);
    };
  }, [listImage]);

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
      previews.push(url);
    }

    setImages((prev) => [...prev, ...files]);
    setListImage((prev) => [...prev, ...previews]);
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
    setInputNameProduct(e.target.value);
    if (tempName === "") {
      setInputNameProductError("Can't not be empty");
    }
    setCountInput(e.target.value.length);
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

  const handleUploadProduct = (e) => {
    e.preventDefault();
    let request = {
      name: inputNameProduct,
      description: inputTextarea,
      price: price,
      available: quantity,
      categoryGroup: categoryGroup.id,
      productDetailRequests: detailInfos,
    };

    console.log(request);
    console.log(videoObj);
    console.log(images);

    const formData = new FormData();
    formData.append("video", videoObj);
    images.forEach((item) => {
      formData.append("images", item);
    });

    formData.append("product", JSON.stringify(request));

    axios
      .post("/api/v1/shop/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        window.location.href = "/seller/portal/product/all";
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {showCancelPopup && (
        <CancelPopup setShowCancelPopup={setShowCancelPopup} />
      )}
      <HeaderSeller title="New Product" path="/seller/portal/product/all" />
      <div className={cx("add-new_wrapper")}>
        <div className={cx("add-new_side-bar")}>
          <SideBar />
        </div>
        <div className={cx("add-new_container")}>
          <div className={cx("add-new_content")}>
            <div className={cx("header")}>Product information</div>
            <div className={cx("content")}>
              <div className={cx("upload-image")}>
                <div className={cx("title")}>Product Images</div>
                <div className={cx("list-image")}>
                  <div className={cx("required-image")}>
                    <span className={cx("required")}>* </span>Scale image 1:1
                  </div>
                  <div className={cx("image-action")}>
                    {listImage &&
                      listImage.map((image, index) => (
                        <ImageItem
                          key={index}
                          image={image}
                          index={index}
                          setListImage={setListImage}
                          setQuantityImage={setQuantityImage}
                        />
                      ))}
                    {listImage.length < 4 && (
                      <div className={cx("image-selected")}>
                        <div
                          className={cx("selected")}
                          onClick={handleClickImage}
                        >
                          <div className={cx("selected-icon")}>
                            <i
                              className={cx(
                                "fa-regular fa-image",
                                "image-icon"
                              )}
                            ></i>
                            <i
                              className={cx("fa-solid fa-plus", "plus-icon")}
                            ></i>
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
              <div className={cx("upload-video")}>
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
                            <div className={cx("duration")}>
                              {videoDuration}
                            </div>
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
              <div className={cx("upload-product-name")}>
                <div className={cx("content")}>
                  <div className={cx("title")}>
                    <span className={cx("required")}>* </span>Product name
                  </div>
                  <div className={cx("name-input")}>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className={
                        inputNameProductError ? cx("input-error") : cx("input")
                      }
                      maxLength={120}
                      onChange={handleChangeInputProductName}
                    />
                    <div className={cx("count-input")}>{countInput}/120</div>
                  </div>
                </div>
                {inputNameProductError && (
                  <div className={cx("product-name-error")}>
                    {inputNameProductError}
                  </div>
                )}
              </div>
              <div className={cx("category-container")}>
                <div className={cx("upload-category")}>
                  <div className={cx("category-main")}>
                    <div className={cx("title")}>
                      <span className={cx("required")}>* </span>Category
                    </div>
                    <Tippy
                      interactive
                      delay={[0, 100]}
                      placement="bottom-end"
                      render={(attrs) => (
                        <div
                          className={cx("select-options")}
                          tabIndex="-1"
                          {...attrs}
                        >
                          <PopperWrapper>
                            {categories.map((category, index) => (
                              <div
                                className={cx("option")}
                                key={index}
                                onClick={() => setCategory(category)}
                              >
                                {category && category.name}
                              </div>
                            ))}
                          </PopperWrapper>
                        </div>
                      )}
                    >
                      <div className={cx("category-select")}>
                        <span
                          className={
                            category.name === "Select a category"
                              ? cx("title-select")
                              : cx("title-select-active")
                          }
                        >
                          {category.name}
                        </span>
                        <i
                          className={cx(
                            "fa-light fa-chevron-down",
                            "select-icon"
                          )}
                        ></i>
                      </div>
                    </Tippy>
                  </div>
                </div>
                <div className={cx("upload-category-group")}>
                  <div className={cx("category-main")}>
                    <div className={cx("title")}>
                      <span className={cx("required")}>* </span> Category Group
                    </div>
                    <Tippy
                      interactive
                      delay={[0, 100]}
                      placement="bottom-end"
                      render={(attrs) => (
                        <div
                          className={cx("select-options")}
                          tabIndex="-1"
                          {...attrs}
                        >
                          <PopperWrapper>
                            {categoryGroups.map((group, index) => (
                              <div
                                className={cx("option")}
                                key={index}
                                onClick={() => setCategoryGroup(group)}
                              >
                                {group && group.name}
                              </div>
                            ))}
                          </PopperWrapper>
                        </div>
                      )}
                    >
                      <div className={cx("category-select")}>
                        <span
                          className={
                            categoryGroup.name === "Select a category group"
                              ? cx("title-select")
                              : cx("title-select-active")
                          }
                        >
                          {categoryGroup.name}
                        </span>
                        <i
                          className={cx(
                            "fa-light fa-chevron-down",
                            "select-icon"
                          )}
                        ></i>
                      </div>
                    </Tippy>
                  </div>
                </div>
              </div>
              <div className={cx("upload-price")}>
                <div className={cx("price-main")}>
                  <div className={cx("title")}>
                    <span className={cx("required")}>* </span>Price
                  </div>
                  <div className={cx("price-content")}>
                    <input
                      type="number"
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
              <div className={cx("upload-quantity")}>
                <div className={cx("quantity-main")}>
                  <div className={cx("title")}>
                    <span className={cx("required")}>* </span>Quantity
                  </div>
                  <div className={cx("quantity-content")}>
                    <input
                      type="number"
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
              <div className={cx("upload-description")}>
                <div className={cx("title")}>
                  <span className={cx("required")}>* </span>Description
                </div>
                <div className={cx("description-input")}>
                  <textarea
                    className={errorTextarea ? cx("input-error") : cx("input")}
                    maxLength={3000}
                    spellCheck={false}
                    onChange={handleChangeTextarea}
                  />
                  <div className={cx("input-notify")}>
                    <div className={cx("error-textarea")}>{errorTextarea}</div>
                    <div className={cx("count-textarea")}>
                      {countTextarea}/3000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {category.name === "Select a category" ? (
            <div className={cx("detail_content-disable")}>
              <div className={cx("header")}>Detail Information</div>
              <div className={cx("content")}>
                <div className={cx("text")}>
                  Can only be adjusted after selecting the category
                </div>
              </div>
            </div>
          ) : (
            <div className={cx("detail_content")}>
              <div className={cx("header")}>Detail Information</div>
              <div className={cx("content")}>
                {detailInfos.map((detail, index) => (
                  <div className={cx("upload-item")} key={index}>
                    <div className={cx("title")}>{detail.name}</div>
                    <div className={cx("item-content")}>
                      <input
                        type="text"
                        className={cx("item-input")}
                        placeholder={detail.name}
                        value={detailInfos[index].value}
                        onChange={(e) => {
                          detailInfos[index].value = e.target.value;
                          setDetailInfos(Array.from(detailInfos));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={cx("save-product-action")}>
            <div className={cx("content")}>
              <div className={cx("cancel")}>
                <button
                  className={cx("cancel-btn")}
                  onClick={() => setShowCancelPopup(true)}
                >
                  Cancel
                </button>
              </div>
              <div className={cx("save")}>
                <button
                  className={cx("save-btn")}
                  onClick={handleUploadProduct}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
