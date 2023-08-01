export const options = {
    legend: {
        show: true,
        position: "bottom",
        offsetX: 0,
        offsetY: 8,
        floating: false,
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 400,
        labels: {
            colors: "#333",
            useSeriesColors: true,
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
        },
        itemMargin: {
            horizontal: 20,
            vertical: 0,
        },
    },
    chart: {
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: "#777",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    grid: {
        row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
        },
    },
    xaxis: {
        categories: [
            "0",
            "00:00 - 05:00",
            "06:00 - 11:00",
            "12:00 - 17:00",
            "18:00 - 23:00",
        ],
    },
    yaxis: {
        labels: {
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "12px",
                fontWeight: 400,
                color: "#777",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    tooltip: {
        theme: "dark",
        x: {
            show: false,
        },
    },
};

export const optionsWeek = {
    legend: {
        show: true,
        position: "bottom",
        offsetX: 0,
        offsetY: 8,
        floating: false,
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 400,
        labels: {
            colors: "#333",
            useSeriesColors: true,
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
        },
        itemMargin: {
            horizontal: 20,
            vertical: 0,
        },
    },
    chart: {
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: "#777",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    grid: {
        row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
        },
    },
    xaxis: {
        categories: [
            "0",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
    },
    yaxis: {
        labels: {
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "12px",
                fontWeight: 400,
                color: "#777",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    tooltip: {
        theme: "dark",
        x: {
            show: false,
        },
    },
};

export const optionsMonth = {
    legend: {
        show: true,
        position: "bottom",
        offsetX: 0,
        offsetY: 8,
        floating: false,
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 400,
        labels: {
            colors: "#333",
            useSeriesColors: true,
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
        },
        itemMargin: {
            horizontal: 20,
            vertical: 0,
        },
    },
    chart: {
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: "#777",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    grid: {
        row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
        },
    },
    xaxis: {
        categories: ["0", "Week 1", "Week 2", "Week 3", "Week 4"],
    },
    yaxis: {
        labels: {
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "12px",
                fontWeight: 400,
                color: "#777",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    tooltip: {
        theme: "dark",
        x: {
            show: false,
        },
    },
};

export const optionsYear = {
    legend: {
        show: true,
        position: "bottom",
        offsetX: 0,
        offsetY: 8,
        floating: false,
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 400,
        labels: {
            colors: "#333",
            useSeriesColors: true,
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
        },
        itemMargin: {
            horizontal: 20,
            vertical: 0,
        },
    },
    chart: {
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: "#777",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    grid: {
        row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
        },
    },
    xaxis: {
        categories: [
            "0",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    yaxis: {
        labels: {
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "12px",
                fontWeight: 400,
                color: "#777",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    tooltip: {
        theme: "dark",
        x: {
            show: false,
        },
    },
};

export const optionPieChartQuantity = {
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

export const optionPieChartRevenue = {
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

export const optionBarChart = {
    legend: {
        show: true,
        position: "bottom",
        offsetX: 0,
        offsetY: 8,
        floating: false,
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 400,
        labels: {
            colors: "#333",
            useSeriesColors: true,
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
        },
        itemMargin: {
            horizontal: 20,
            vertical: 0,
        },
    },
    chart: {
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: "#777",
    },
    colors: "#CD1818",
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: {
        labels: {
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "12px",
                fontWeight: 400,
                color: "#777",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    tooltip: {
        theme: "dark",
        x: {
            show: false,
        },
    },
};
