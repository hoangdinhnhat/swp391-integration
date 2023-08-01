import classNames from "classnames/bind";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.scss";

const cx = classNames.bind(styles);

const statusNav = [
  {
    title: "All",
    to: "/purchase/all",
  },
  {
    title: "Contact",
    to: "/purchase/contact",
  },
  {
    title: "Pending",
    to: "/purchase/pending",
  },
  {
    title: "Shipping",
    to: "/purchase/shipping",
  },
  {
    title: "Completed",
    to: "/purchase/complete",
  },
  {
    title: "Canceled",
    to: "/purchase/cancel",
  },
  {
    title: "Return Refund",
    to: "/purchase/refund",
  },
];

function NavBar() {
  const { pathname } = useLocation();

  return (
    <div className={cx("purchase_header-nav")}>
      {statusNav.map((status, index) => (
        <NavLink
          key={index}
          to={status.to}
          className={({ isActive }) =>
            [cx("nav"), isActive ? cx("nav-active") : null].join(" ")
          }
          isActive={() =>
            [
              "/purchase/all",
              "/purchase/pending",
              "/purchase/shipping",
              "/purchase/complete",
              "/purchase/cancel",
              "/purchase/refund"
            ].includes(pathname)
          }
        >
          <span className={cx("nav-text")}>{status.title}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default NavBar;
