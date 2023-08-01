import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import "react-circular-progressbar/dist/styles.css";

import styles from "./DashboardAdmin.module.scss";
import Sidebar from "../global/Sidebar";
import RevenueChart from "./Chart/RevenueChart";
import ProductsChart from "./Chart/ProductsChart";
import CatRevenueChart from "./Chart/CatRevenueChart";
import Topbar from "../global/Topbar";
import axios from "axios";

const cx = classNames.bind(styles);

function DashboardAdmin() {
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/admin/analyst/total")
      .then((res) => {
        setTotalData(res.data);
      })
      .catch((e) => console.log(e.response.code));
  }, []);

  return (
    <>
      <Topbar />
      <div className={cx("container")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("dashboard-container")}>
          <div className={cx("dashboard-items")}>
            <div className={cx("card-container")}>
              <div className={cx("card-items")}>
                <div className={cx("card-item", "item1")}>
                  <div className={cx("card-text")}>
                    <p className={cx("card-title")}>TOTAL ORDERS</p>
                    <p className={cx("card-number")}>{totalData[0]}</p>
                  </div>
                </div>

                <div className={cx("card-item", "item2")}>
                  <div className={cx("card-text")}>
                    <p className={cx("card-title")}>TOTAL SALES</p>
                    <p className={cx("card-number")}>{totalData[1]}</p>
                  </div>
                </div>
                <div className={cx("card-item", "item3")}>
                  <div className={cx("card-text")}>
                    <p className={cx("card-title")}>TOTAL VISITS</p>
                    <p className={cx("card-number")}>{totalData[2]}</p>
                  </div>
                </div>
                <div className={cx("card-item", "item4")}>
                  <div className={cx("card-text")}>
                    <p className={cx("card-title")}>NEWLY MEMBERS</p>
                    <p className={cx("card-number")}>{totalData[3]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("overview-chart")}>
              <div className={cx("revenue-chart")}>
                <div className={cx("text")}>Weekly Revenue</div>
                <div className={cx("data-chart")}>
                  <RevenueChart />
                </div>
              </div>
              <div className={cx("totalCat-chart")}>
                <div className={cx("text")}>Total Products</div>
                <div className={cx("data-chart")}>
                  <ProductsChart />
                </div>
              </div>
            </div>
            <div className={cx("detailCat-chart")}>
              <div className={cx("text")}>Categories Revenue</div>
              <div className={cx("data-chart")}>
                <CatRevenueChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
