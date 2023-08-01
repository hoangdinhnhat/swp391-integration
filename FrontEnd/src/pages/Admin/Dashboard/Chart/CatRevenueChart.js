import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const series = [
  {
    name: "Bird",
    data: [44, 55, 41, 67, 22, 43, 65, 43, 13, 41, 51, 12, 15, 36],
  },
  {
    name: "Bird Food",
    data: [13, 23, 20, 8, 13, 27, 65, 43, 13, 41, 51, 12, 15, 36],
  },
  {
    name: "Bird Cage",
    data: [11, 17, 15, 15, 21, 14, 65, 43, 13, 41, 51, 12, 15, 36],
  },
  {
    name: "Bird Accessory",
    data: [21, 7, 25, 13, 22, 8, 65, 43, 13, 41, 51, 12, 15, 36],
  },
];

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);
  return previous;
}

const lastTwoWeek = () => {
  let rs = [];
  let counter = new Date();
  let i = 0;
  while (i <= 13) {
    rs.push(counter.toLocaleDateString());
    counter = getPreviousDay(counter);
    i++;
  }
  return rs;
};

const options = {
  chart: {
    type: "bar",
    width: "50%",
    height: 500,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "13px",
            fontWeight: 900,
          },
        },
      },
    },
  },
  xaxis: {
    type: "datetime",
    categories: lastTwoWeek().reverse(),
  },
  legend: {
    position: "right",
    offsetY: 40,
  },
  fill: {
    opacity: 1,
  },
};

function CatRevenueChart() {
  const [updateSeries, setUpdateSeries] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/admin/analyst/category/revenue")
      .then((res) => {
        console.log(res.data);
        let newSeries = [...series];
        res.data.forEach((item, index) => {
          newSeries[index].data = item;
        });
        setUpdateSeries(newSeries);
      })
      .catch((e) => console.log(e.response.code));
  }, []);
  return (
    <>
      <ReactApexChart
        type="bar"
        width={"100%"}
        height={"100%"}
        series={updateSeries}
        options={options}
      />
    </>
  );
}

export default CatRevenueChart;
