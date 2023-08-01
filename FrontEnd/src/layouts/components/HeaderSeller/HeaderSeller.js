import className from "classnames/bind";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { UserContext } from "~/userContext/Context";
import SellerNotify from "./SellerNotify";
import styles from "./HeaderSeller.module.scss";
import { useContext, useEffect, useState } from "react";

const cx = className.bind(styles);

function HeaderSeller({ title, path = "/seller/portal/dashboard" }) {
  const UC = useContext(UserContext);
  const context = UC.state;
  const [shop, setShop] = useState({
    id: 0,
    name: "",
    shopImage: "",
    rating: 5,
    joinTime: "",
    followers: 0,
    products: 0,
    address: {
      province: {
        id: 0,
        name: "",
      },
      district: {
        id: 0,
        name: "",
      },
      ward: {
        id: 0,
        name: "",
      },
      specificAddress: "",
    },
    wallet: 0,
  });

  useEffect(() => {
    if (context && context.shopDTO) {
      setShop(context.shopDTO);
    }
  }, [context]);

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  return (
    <div className={cx("header")}>
      <div className={cx("header-content")}>
        <div className={cx("header-link")}>
          <Link to={path} className={cx("link")}>
            {/* <img src={images} alt="Bird" className={cx('logo')} /> */}
            <p className={cx("text")}>
              <span className={cx("sub-text")}>B</span>ird
              <span className={cx("inner-subText")}>
                <span className={cx("sub-text")}>T</span>rading
              </span>
            </p>
            <div className={cx("otherText")}>{title}</div>
          </Link>
        </div>
        <div className={cx("header-info")}>
          <Tippy
            interactive
            delay={[0, 100]}
            placement="bottom"
            render={(attrs) => (
              <div className={cx("user-options")} tabIndex="-1" {...attrs}>
                {/* -----------------Chua login----------------- */}
                <PopperWrapper>
                  <div className={cx("option-first")}>
                    <Link
                      to="/seller/portal/shop"
                      className={cx("shop-profile")}
                    >
                      <i
                        className={cx("icon-sub", "fa-light fa-address-card")}
                      ></i>
                      <span>Shop Profile</span>
                    </Link>
                  </div>
                  <div className={cx("option-logout")}>
                    <Link to="/" className={cx("logout-link")}>
                      <i
                        className={cx("icon-sub", "fa-regular fa-power-off")}
                      ></i>
                      <span>Log Out</span>
                    </Link>
                  </div>
                  <div className={cx("option-logout")}>
                    <Link to="#" className={cx("logout-link")}>
                      <i className={cx("icon-sub", "fa-regular fa-coins")}></i>
                      <span>Wallet: ${roundedFloat(shop.wallet)}</span>
                    </Link>
                  </div>
                </PopperWrapper>
              </div>
            )}
          >
            <div className={cx("info-seller")}>
              <div className={cx("seller-avatar")}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    alt="avatar"
                    src={shop.shopImage}
                    sx={{ width: 33, height: 33 }}
                  />
                </Stack>
              </div>
              <span className={cx("seller-name")}>{shop.name}</span>
            </div>
          </Tippy>
          <SellerNotify />
        </div>
      </div>
    </div>
  );
}

export default HeaderSeller;
