import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

import styles from "./Setting.module.scss";

const cx = classNames.bind(styles);

function Setting() {
  const [settingsList, setSettingList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/admin/management/setting")
      .then((res) => {
        setSettingList(res.data);
      })
      .catch((e) => console.log(e.response.status));
  }, []);

  const handleChange = (e, setting) => {
    let index = settingsList.indexOf(setting);
    settingsList[index].value = e.target.value;
    setSettingList(Array.from(settingsList));
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/admin/management/setting/update", settingsList)
      .then((res) => {
        alert("Saving successfully");
      })
      .catch((e) => console.log(e.response.status));
  };

  const handleToggleFS = (e, setting) => {
    let index = settingsList.indexOf(setting);
    settingsList[index].value = e.target.checked ? 1 : 0;
    setSettingList(Array.from(settingsList));
  };

  return (
    <>
      <Topbar />
      <div className={cx("setting_wrapper")}>
        <div className={cx("setting_sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("setting_container")}>
          <div className={cx("setting-content")}>
            <div className={cx("setting-header")}>
              <i className={cx("fa-light fa-gear", "setting-icon")}></i>
              <span className={cx("text")}>Settings</span>
            </div>
            <div className={cx("setting-content_main")}>
              <div className={cx("setting-list-item")}>
                {settingsList.map((item) => {
                  if (item.name === "FlashSale") {
                    return (
                      <div className={cx("flashSale")}>
                        <span className={cx("text")}>Flash Sale</span>
                        <Switch
                          checked={item.value === 1 ? true : false}
                          name="switch"
                          color="primary"
                          onChange={(e) => handleToggleFS(e, item)}
                        />
                      </div>
                    );
                  }
                  return (
                    <div className={cx("setting-item")} key={item.id}>
                      <div className={cx("type-setting")}>{item.name}: </div>
                      <div className={cx("edit-setting")}>
                        <input
                          type="number"
                          className={cx("input")}
                          value={item.value}
                          onChange={(e) => handleChange(e, item)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={cx("setting-footer")} onClick={handleSave}>
              <button className={cx("save-btn")}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
