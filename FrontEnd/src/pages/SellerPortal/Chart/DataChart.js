import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import HeaderSeller from "~/layouts/components/HeaderSeller";
import WidgetCard from "./WidgetCard";
import PieChartQuantity from "./PieChartQuantity";
import PieChartRevenue from "./PieChartRevenue";
import BarChart from "./BarChart";
import styles from "./Chart.module.scss";
import Chart from "react-apexcharts";
import {
  options,
  optionsMonth,
  optionsWeek,
  optionsYear,
} from "./OptionsChart";
import axios from "axios";

const cx = classNames.bind(styles);

function DataChart() {
  const [widgets, setWidgets] = useState([
    {
      id: 0,
      type: "Revenue",
      isMoney: true,
      data: 0,
      compareTitle: "vs previous ",
      compareData: 0,
    },
    {
      id: 1,
      type: "Sale",
      isMoney: false,
      data: 0,
      compareTitle: "vs previous ",
      compareData: 0,
    },
    {
      id: 2,
      type: "Order",
      isMoney: false,
      data: 0,
      compareTitle: "vs previous ",
      compareData: 0,
    },
    {
      id: 3,
      type: "Follower",
      isMoney: false,
      data: 0,
      compareTitle: "vs previous ",
      compareData: 0,
    },
    {
      id: 4,
      type: "Feedback",
      isMoney: false,
      data: 0,
      compareTitle: "vs previous ",
      compareData: 0,
    },
  ]);
  const [data, setData] = useState([
    {
      name: "Revenue",
      color: "#ff0000",
      data: [],
    },
    {
      name: "Sale",
      color: "#00ff00",
      data: [],
    },
    {
      name: "Order",
      color: "#0000ff",
      data: [],
    },
    {
      name: "Follower",
      color: "#cc00ff",
      data: [],
    },
    {
      name: "Feedback",
      color: "#ff33cc",
      data: [],
    },
  ]);
  const [listOptions, setListOptions] = useState({
    day: options,
    week: optionsWeek,
    month: optionsMonth,
    year: optionsYear,
  });
  const [selectedWidget, setSelectedWidget] = useState([0]);
  const [constantAnalyst, setConstantAnalyst] = useState({});
  const [option, setOption] = useState({ ...options });
  const [countSelected, setCountSelected] = useState(1);
  const [filter, setFilter] = useState("day");

  useEffect(() => {
    setOption((prev) => {});
    axios
      .get("/api/v1/shop/analyst/" + filter)
      .then((res) => {
        console.log(res.data);
        res.data.forEach((item, index) => {
          let totalPrev = item.prev.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          let totalCur = item.cur.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          data[index].data = [0, ...item.cur];
          widgets[index].data = totalCur;
          widgets[index].compareData =
            totalPrev == 0
              ? totalCur - totalPrev
              : Math.round((totalCur / totalPrev) * 100 - 100);
        });
        setData(Array.from(data));
        setWidgets(Array.from(widgets));
        setOption((prev) => listOptions[filter]);
      })
      .catch((e) => console.log(e));
  }, [filter]);

  useEffect(() => {
    axios
      .get("/api/v1/shop/analyst/constant")
      .then((res) => {
        setConstantAnalyst(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <HeaderSeller title="Data Chart" />
      <div className={cx("chart_wrapper")}>
        <div className={cx("chart_container")}>
          <div className={cx("chart_content")}>
            <div div className={cx("chart-content_header")}>
              <button
                className={cx("chart-btn", { active: filter === "day" })}
                onClick={() => {
                  setFilter("day");
                }}
              >
                Day
              </button>
              <button
                className={cx("chart-btn", { active: filter === "week" })}
                onClick={() => {
                  setFilter("week");
                }}
              >
                Week
              </button>
              <button
                className={cx("chart-btn", { active: filter === "month" })}
                onClick={() => {
                  setFilter("month");
                }}
              >
                Month
              </button>
              <button
                className={cx("chart-btn", { active: filter === "year" })}
                onClick={() => {
                  setFilter("year");
                }}
              >
                Year
              </button>
            </div>
            <div className={cx("chart-content_dataChart")}>
              <div className={cx("dataChart-title")}>Overview</div>
              <div className={cx("dataChart-widget")}>
                {widgets
                  .map((w) => ({
                    ...w,
                    compareTitle: w.compareTitle + filter,
                  }))
                  .map((widget) => (
                    <WidgetCard
                      key={widget.id}
                      data={widget}
                      setCountSelected={setCountSelected}
                      setSelectedWidget={setSelectedWidget}
                      selectedWidget={selectedWidget}
                    />
                  ))}
              </div>
              <div className={cx("dataChart-chart-header")}>
                <div className={cx("chart-title")}>Chart</div>
                <div className={cx("chart-count")}>
                  Selected{" "}
                  <span className={cx("count")}>{countSelected}/5</span>
                </div>
              </div>
              <div className={cx("dataChart-chart-data")}>
                <Chart
                  type="line"
                  width={"100%"}
                  height={"100%"}
                  series={[
                    ...data.filter(
                      (d, index) => selectedWidget.indexOf(index) !== -1
                    ),
                  ]}
                  options={option}
                />
              </div>
            </div>
            <div className={cx("chart-content_moreChart")}>
              <div className={cx("chart-content_pieChart")}>
                <div className={cx("pieChart-quantity")}>
                  <div className={cx("title")}>Category Quantity</div>
                  <PieChartQuantity data={constantAnalyst["cq"]} />
                </div>
                <div className={cx("pieChart-revenue")}>
                  <div className={cx("title")}>Category Revenue</div>
                  <PieChartRevenue data={constantAnalyst["cr"]} />
                </div>
              </div>
              <div className={cx("chart-content_barChart")}>
                <div className={cx("title")}>Sale Quantity</div>
                <BarChart data={constantAnalyst["sq"]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataChart;
