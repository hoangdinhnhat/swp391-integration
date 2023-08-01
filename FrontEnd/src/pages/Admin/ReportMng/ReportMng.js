import classNames from "classnames/bind";

import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import ReportProduct from "./ReportProduct";
import ReportShop from "./ReportShop";
import ReportOrder from "./ReportOrder";
import styles from "./ReportMng.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function ReportMng() {
  const [navOption, setNavOption] = useState("Product Report");
  return (
    <>
      <Topbar />
      <div className={cx("report_wrapper")}>
        <div className={cx("report_sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("report_container")}>
          <div className={cx("report-content")}>
            <div className={cx("report-nav")}>
              <button
                className={cx("nav-btn", {
                  active: navOption === "Product Report",
                })}
                onClick={() => setNavOption("Product Report")}
              >
                Product Report
              </button>
              <button
                className={cx("nav-btn", {
                  active: navOption === "Shop Report",
                })}
                onClick={() => setNavOption("Shop Report")}
              >
                Shop Report
              </button>
              <button
                className={cx("nav-btn", {
                  active: navOption === "Order Report",
                })}
                onClick={() => setNavOption("Order Report")}
              >
                Order Report
              </button>
            </div>
            {navOption === "Product Report" && <ReportProduct />}
            {navOption === "Shop Report" && <ReportShop />}
            {navOption === "Order Report" && <ReportOrder />}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportMng;
