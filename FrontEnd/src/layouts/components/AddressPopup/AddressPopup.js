import classNames from "classnames/bind";
import styles from "./AddressPopup.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";

const cx = classNames.bind(styles);

function AddressPopup({ closeModel }) {
  const [receiveInfo, setReceiveInfo] = useState({
    fullname: "",
    phone: "",
    province: undefined,
    district: undefined,
    ward: undefined,
    specific_address: "",
    _default: false,
  });
  const [Add, setAdd] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [searchP, setSearchP] = useState("");
  const [searchD, setSearchD] = useState("");
  const [searchW, setSearchW] = useState("");

  const [focusP, setFocusP] = useState(false);
  const [focusD, setFocusD] = useState(false);
  const [focusW, setFocusW] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            "Content-Type": "application/json",
            Token: "fc0ea700-c65d-11ed-ab31-3eeb4194879e",
          },
        }
      )
      .then((res) => {
        let newArr = res.data.data
          .map((p) => ({
            id: p.ProvinceID,
            name: p.NameExtension[0]
          }))
          .filter(
            (p) =>
              p.name.toLowerCase().indexOf(searchP.toLowerCase()) !== -1
          );
        setProvinces(Array.from(newArr));
      });
  }, [searchP]);

  useEffect(() => {
    if (receiveInfo.province) {
      axios
        .get(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
            receiveInfo.province.id,
          {
            headers: {
              "Content-Type": "application/json",
              token: "fc0ea700-c65d-11ed-ab31-3eeb4194879e",
            },
          }
        )
        .then((res) => {
          let newArr = res.data.data
            .filter((d) => d.NameExtension)
            .map((d) => ({
              id: d.DistrictID,
              name: d.NameExtension[0],
            }))
            .filter(
              (d) =>
                d.name.toLowerCase().indexOf(searchD.toLowerCase()) !==
                -1
            );
          setDistricts(Array.from(newArr));
        });
    }
  }, [receiveInfo.province, searchD]);

  useEffect(() => {
    if (receiveInfo.district) {
      axios
        .get(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
            receiveInfo.district.id,
          {
            headers: {
              "Content-Type": "application/json",
              token: "fc0ea700-c65d-11ed-ab31-3eeb4194879e",
            },
          }
        )
        .then((res) => {
          let newArr = res.data.data
            .filter((w) => w.NameExtension)
            .map((w) => ({
              id: w.WardCode,
              name: w.NameExtension[0],
            }))
            .filter(
              (w) =>
                w.name.toLowerCase().indexOf(searchW.toLowerCase()) !==
                -1
            );
          setWards(Array.from(newArr));
        });
    }
  }, [receiveInfo.district, searchW]);

  const handleHideP = () => {
    setFocusP(false);
  };
  const handleHideD = () => {
    setFocusD(false);
  };
  const handleHideW = () => {
    setFocusW(false);
  };

  useEffect(() => {
    if (Add) {
      let AddReceiveRequest = {
        ...receiveInfo,
        province: receiveInfo.province.name,
        district: receiveInfo.district.name,
        ward: receiveInfo.ward.name
      }
      axios
        .post("/api/v1/users/info/receives", AddReceiveRequest)
        .then((res) => {
          window.location.href = '/user/account/address'
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [Add]);

  const handleAddNewReceive = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("addr-popup")}>
        <div className={cx("addr-container")}>
          <div className={cx("popup-head")}>
            <span className={cx("popup-head-text")}>New receive info</span>
          </div>
          <div className={cx("popup-content")}>
            <div className={cx("addr-content")}>
              <div className={cx("addr-field", "text-name")}>
                <input
                  type="text"
                  className={cx("form-input")}
                  placeholder=" "
                  required
                  value={receiveInfo.fullname}
                  onChange={(e) =>
                    setReceiveInfo({ ...receiveInfo, fullname: e.target.value })
                  }
                />
                <label className={cx("form-label")}>Full name</label>
              </div>
              <div className={cx("addr-field", "text-phone")}>
                <input
                  type="text"
                  className={cx("form-input")}
                  placeholder=" "
                  required
                  value={receiveInfo.phone}
                  onChange={(e) =>
                    setReceiveInfo({ ...receiveInfo, phone: e.target.value })
                  }
                />
                <label htmlFor="text" className={cx("form-label")}>
                  Phone
                </label>
              </div>
            </div>
            <div className={cx("addr-detail")}>
              <Tippy
                interactive
                visible={focusP}
                delay={[0, 200]}
                placement="bottom-start"
                render={(attrs) => (
                  <div className={cx("province-list")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      {provinces.map((item) => (
                        <span
                          key={item.id}
                          className={cx("province-item")}
                          onClick={() => {
                            setFocusP((f) => !f);
                            setSearchP(item.name)
                            setSearchD("")
                            setSearchW("")
                            setReceiveInfo({
                              ...receiveInfo,
                              province: item,
                              district: undefined,
                              ward: undefined,
                            });
                          }}
                        >
                          {item.name}
                        </span>
                      ))}
                    </PopperWrapper>
                  </div>
                )}
                onClickOutside={handleHideP}
              >
                <div className={cx("addr-field")}>
                  <input
                    type="text"
                    className={cx("form-input")}
                    placeholder=" "
                    onFocus={() => {
                      setFocusP(true)
                      setSearchP("")
                    }}
                    value={searchP}
                    onChange={(e) => setSearchP(e.target.value.trim())}
                    required
                  />
                  <label htmlFor="text" className={cx("form-label")}>
                    Province
                  </label>
                </div>
              </Tippy>

              <Tippy
                interactive
                visible={focusD}
                delay={[0, 200]}
                placement="bottom"
                render={(attrs) => (
                  <div className={cx("province-list")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      {districts.map((item) => (
                        <span
                          key={item.id}
                          className={cx("province-item")}
                          onClick={() => {
                            setFocusD((f) => !f);
                            setSearchD(item.name)
                            setSearchW("")
                            setReceiveInfo({ ...receiveInfo, district: item, ward: undefined});
                          }}
                        >
                          {item.name}
                        </span>
                      ))}
                    </PopperWrapper>
                  </div>
                )}
                onClickOutside={handleHideD}
              >
                <div className={cx("addr-field")}>
                  <input
                    type="text"
                    className={cx("form-input")}
                    placeholder=" "
                    onFocus={() => {
                      setFocusD(true)
                      setSearchD("")
                    }}
                    required
                    disabled={!receiveInfo.province}
                    value={searchD}
                    onChange={(e) => setSearchD(e.target.value.trim())}
                  />
                  <label htmlFor="text" className={cx("form-label")}>
                    District
                  </label>
                </div>
              </Tippy>
              <Tippy
                interactive
                visible={focusW}
                delay={[0, 200]}
                placement="bottom"
                render={(attrs) => (
                  <div className={cx("province-list")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      {wards.map((item) => (
                        <span
                          key={item.id}
                          className={cx("province-item")}
                          onClick={() => {
                            setFocusW((f) => !f);
                            setSearchW(item.name)
                            setReceiveInfo({ ...receiveInfo, ward: item });
                          }}
                        >
                          {item.name}
                        </span>
                      ))}
                    </PopperWrapper>
                  </div>
                )}
                onClickOutside={handleHideW}
              >
                <div className={cx("addr-field")}>
                  <input
                    type="text"
                    className={cx("form-input")}
                    placeholder=" "
                    onFocus={() => {
                      setFocusW(true)
                      setSearchW("")
                    }}
                    required
                    disabled={!receiveInfo.district}
                    value={searchW}
                    onChange={(e) => setSearchW(e.target.value.trim())}
                  />
                  <label htmlFor="text" className={cx("form-label")}>
                    Ward
                  </label>
                </div>
              </Tippy>
            </div>
            <div className={cx("specific-add")}>
              <div className={cx("addr-field")}>
                <input
                  type="text"
                  className={cx("form-input")}
                  placeholder=" "
                  required
                  value={receiveInfo.specific_address}
                  onChange={(e) =>
                    setReceiveInfo({
                      ...receiveInfo,
                      specific_address: e.target.value,
                    })
                  }
                />
                <label htmlFor="text" className={cx("form-label")}>
                  Specific address
                </label>
              </div>
            </div>
          </div>
          <div className={cx("popup-footer")}>
            <div className={cx("popup-btn")}>
              <button
                className={cx("cancel", "p-btn")}
                onClick={() => closeModel(false)}
              >
                Cancel
              </button>
              <button
                className={cx("update", "p-btn")}
                onClick={handleAddNewReceive}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressPopup;
