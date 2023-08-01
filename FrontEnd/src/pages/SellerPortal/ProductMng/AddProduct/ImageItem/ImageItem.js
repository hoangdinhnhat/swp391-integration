import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./ImageItem.module.scss";

const cx = classNames.bind(styles);

function ImageItem({ image, index, setListImage, setQuantityImage }) {
  const [showDeleteImage, setShowDeleteImage] = useState(false);

  return (
    <div
      className={cx("load-image")}
      onMouseEnter={() => setShowDeleteImage(true)}
      onMouseLeave={() => setShowDeleteImage(false)}
    >
      <img src={image} alt="load-img" className={cx("load-item")} />
      {showDeleteImage && (
        <div className={cx("action")}>
          <i
            className={cx("fa-regular fa-trash-can", "delete-icon")}
            onClick={() => {
              setListImage((prev) => prev.filter((item, id) => id !== index));
              setQuantityImage((pre) => pre - 1);
            }}
          ></i>
        </div>
      )}
    </div>
  );
}

export default ImageItem;
