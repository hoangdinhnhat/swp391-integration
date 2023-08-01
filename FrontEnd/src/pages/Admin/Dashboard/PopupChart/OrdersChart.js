import React from "react";
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
        offsetY: 10,
        itemMargin: {
            horizontal: 10,
            vertical: 5,
        },
    },
};

function OrdersChart() {
    return (
        <>
            <Chart
                type="donut"
                width={"100%"}
                height={"100%"}
                series={[281, 166, 181, 251]}
                options={options}
            />
        </>
    );
}

export default OrdersChart;
