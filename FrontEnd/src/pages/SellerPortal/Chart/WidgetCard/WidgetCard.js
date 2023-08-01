import classNames from "classnames/bind";
import styles from "./WidgetCard.module.scss";
import { message } from "antd";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const styleWidget = (type) => {
  if (type === "Revenue") {
    return {
      borderTop: "3px solid red",
    };
  } else if (type === "Sale") {
    return {
      borderTop: "3px solid green",
    };
  } else if (type === "Order") {
    return {
      borderTop: "3px solid blue",
    };
  } else if (type === "Follower") {
    return {
      borderTop: "3px solid purple",
    };
  } else {
    return {
      borderTop: "3px solid pink",
    };
  }
};

function WidgetCart({
  data,
  setCountSelected,
  setSelectedWidget,
  selectedWidget,
}) {
  const [messageApi, contextHolder] = message.useMessage();

  const selectedCondition = () => {
    return selectedWidget.indexOf(data.id) !== -1;
  };

  const handleToggleWidget = () => {
    let isSelected = selectedCondition();

    if (isSelected) {
      if (selectedWidget.length > 1) {
        let newSelected = selectedWidget.filter((w) => w !== data.id);
        setSelectedWidget(Array.from(newSelected));
      } else {
        messageApi.open({
          type: "warning",
          content: "Please select at least one",
          className: "custom-class",
          style: {
            marginTop: "8vh",
            fontSize: "1.7rem",
          },
        });
      }
    } else {
      let newArr = [data.id];
      setSelectedWidget(Array.from(newArr));
    }
  };

  useEffect(() => {
    setCountSelected(selectedWidget.length);
  }, [selectedWidget]);

  return (
    <>
      {contextHolder}
      <div
        className={cx("widget_container")}
        style={{
          ...(selectedCondition() && styleWidget(data.type)),
        }}
        onClick={() => {
          handleToggleWidget();
        }}
      >
        <div className={cx("widget-title")}>{data.type}</div>
        <div className={cx("widget-data")}>
          <div className={cx("data")}>
            {data.isMoney ? "$" : ""}
            {data.data}
          </div>
        </div>
        <div className={cx("widget-compare")}>
          <div className={cx("compare-title")}>{data.compareTitle}</div>
          {data.compareData > 0 ? (
            <div className={cx("compare-data-up")}>
              <span className={cx("data")}>{data.compareData}%</span>
              <i className={cx("fa-solid fa-arrow-up", "up-icon")}></i>
            </div>
          ) : (
            <div className={cx("compare-data-down")}>
              <span className={cx("data")}>{data.compareData}%</span>
              <i className={cx("fa-solid fa-arrow-down", "down-icon")}></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WidgetCart;
