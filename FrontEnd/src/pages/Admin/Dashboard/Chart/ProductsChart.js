import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

var options = {
  labels: ["Bird", "Bird Food", "Bird Cage", "Bird Accessory"],
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            fontSize: 22,
            fontWeight: "bold",
            color: "#000",
          },
        },
      },
    },
  },

  legend: {
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "14px",
    markers: {
      width: 12,
      height: 12,
    },
    offsetY: 5,
    itemMargin: {
      horizontal: 10,
      vertical: 5,
    },
  },
};

function ProductsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/admin/analyst/category/product")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e.response.code));
  }, []);
  return (
    <>
      <Chart
        type="donut"
        width={"100%"}
        height={"100%"}
        series={data}
        options={options}
      />
    </>
  );
}

export default ProductsChart;
