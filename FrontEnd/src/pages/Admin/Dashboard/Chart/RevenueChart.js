import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    id: "basic-area",
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  fill: {
    colors: ["#CC0000"],
  },
  stroke: {
    curve: "smooth",
    colors: ["#FF0000"],
  },
  dataLabels: {
    enabled: false,
  },
};

function RevenueChart() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/admin/analyst/weekly-revenue")
      .then((res) => {
        setSeries([
          {
            name: "Weekly Revenue",
            data: res.data.reverse(),
          },
        ]);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={400}
      />
    </div>
  );
}

export default RevenueChart;
