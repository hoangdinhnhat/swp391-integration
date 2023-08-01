import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const cx = classNames.bind(styles);
const options = [
  {
    id: 1,
    title: "Dashboard",
    icon: "fa-light fa-table-columns",
    path: "/admin/portal/dashboard",
  },
  {
    id: 2,
    title: "User",
    icon: "fa-light fa-bag-shopping",
    path: "/admin/portal/usermng/all",
  },
  {
    id: 3,
    title: "Shop",
    icon: "fa-thin fa-clipboard-list",
    path: "/admin/portal/shopmng/all",
  },
  {
    id: 4,
    title: "Product",
    icon: "fa-sharp fa-light fa-box-dollar",
    path: "/admin/portal/productmng/all",
  },
  {
    id: 5,
    title: "Report",
    icon: "fa-light fa-hexagon-exclamation",
    path: "/admin/portal/report",
  },
  {
    id: 6,
    title: "Settings",
    icon: "fa-light fa-gear",
    path: "/admin/portal/settings",
  },
  {
    id: 7,
    title: "Wallet: 10",
    icon: "fa-regular fa-coins",
    path: "#",
  },
];

function Sidebar() {
  const { pathname } = useLocation();

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    axios
      .get("/api/v1/admin/wallet/")
      .then((res) => {
        console.log(res.data);
        options[6].title = "Wallet: $" + roundedFloat(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={cx("sidebar")}>
      <div className={cx("side-bar_menu-item")}>
        {options.map((option) => (
          <NavLink
            to={option.path}
            key={option.id}
            className={({ isActive }) =>
              [cx("nav-item"), isActive ? cx("nav-active") : null].join(" ")
            }
            isActive={() =>
              [
                "/admin/portal/dashboard",
                "/admin/portal/usermng/all",
                "/admin/portal/shopmng/all",
                "/admin/portal/productmng/all",
              ].includes(pathname)
            }
          >
            <i className={cx(option.icon, "nav-icon")}></i>
            <span className={cx("nav-text")}>{option.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
