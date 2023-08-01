import classNames from "classnames/bind";
import Chart from "react-apexcharts";
import {optionPieChartQuantity as options} from "./OptionsChart"
import styles from "./Chart.module.scss";

const cx = classNames.bind(styles);

const series = [100, 156, 317, 124];


function PieChartQuantity({data = series}) {
    return (
        <div className={cx("pieChart")}>
            <Chart
                type="donut"
                width={"100%"}
                height={"100%"}
                series={data}
                options={options}
            />
        </div>
    );
}

export default PieChartQuantity;
