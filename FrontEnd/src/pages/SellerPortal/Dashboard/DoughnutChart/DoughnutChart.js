import classNames from "classnames/bind";

import Chart from "react-apexcharts";

import styles from "./DoughnutChart.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function DoughnutChart() {
    const [revenues, setRevenues] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("/api/v1/shop/category/all")
            .then(res => setCategories(res.data.map(item => item.name)))
            .catch(e => console.log(e))

        axios.get("/api/v1/shop/category/revenue")
            .then(res => setRevenues(res.data))
            .catch(e => console.log(e))

    }, [])

    const options = {
        labels: categories,
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
                            formatter: function (w) {
                                return "$" + w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            },
                        },
                        value: {
                            formatter: function (val) {
                                return "$" + val;
                            },
                        },
                    },
                },
            },
        },

        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "16px",
            markers: {
                width: 15,
                height: 15,
            },
            offsetY: 6,
            itemMargin: {
                horizontal: 10,
                vertical: 0,
            },
        },
    };
    return (
        <div className={cx("chart-donut")}>
            <Chart type="donut" width="500" height="450" series={revenues} options={options}/>
        </div>
    );
}

export default DoughnutChart;
