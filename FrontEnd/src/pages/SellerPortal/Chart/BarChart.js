import classNames from "classnames/bind";
import {optionBarChart} from "./OptionsChart";
import Chart from "react-apexcharts";
import styles from "./Chart.module.scss";

const cx = classNames.bind(styles);

function BarChart({data}) {

    return (
        <div className={cx("barChart")}>
            <Chart
                type="bar"
                width={"100%"}
                height={"100%"}
                series={[{
                    name: "Quantity",
                    data: data
                }]}
                options={optionBarChart}
            />
        </div>
    );
}

export default BarChart;
