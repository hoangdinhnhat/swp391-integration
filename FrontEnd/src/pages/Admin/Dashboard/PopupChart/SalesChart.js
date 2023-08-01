import React from "react";
import Chart from "react-apexcharts";

function SalesChart() {
    const series = [
        {
            name: "Last Week",
            color: "#e6e6e6",
            data: [30, 40, 35, 50, 49, 60, 70],
        },
        {
            name: "This Week",
            color: "#1a9afb",
            data: [23, 12, 54, 61, 32, 56, 81],
        },
    ];

    const options = {
        chart: {
            id: "basic-line",
        },
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "14px",
            markers: {
                width: 12,
                height: 12,
            },
            offsetY: 10,
            itemMargin: {
                horizontal: 10,
                vertical: 5,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
    };
    return (
        <Chart options={options} series={series} type="line" height={500}/>
    )
}

export default SalesChart