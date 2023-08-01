import classNames from "classnames/bind";

import RevenueChart from "./RevenueChart";
import OrderChart from "./OrderChart";
import FollowerChart from "./FollowerChart";
import FeedbackChart from "./FeedBackChart";
import styles from "./OverViewChart.module.scss";


const cx = classNames.bind(styles);

function OverViewChart({dataChart}) {
    return (
        <div className={cx("chart")}>
            {dataChart.type === "Revenue" && <RevenueChart dataChart={dataChart}/>}
            {dataChart.type === "Order" && <OrderChart dataChart={dataChart}/>}
            {dataChart.type === "Follower" && <FollowerChart dataChart={dataChart}/>}
            {dataChart.type === "Feedback" && <FeedbackChart dataChart={dataChart}/>}
        </div>
    );
}

export default OverViewChart;
