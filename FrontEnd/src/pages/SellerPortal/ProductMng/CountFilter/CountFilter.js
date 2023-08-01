import classNames from "classnames/bind";
import {useState} from "react";
import Tippy from "@tippyjs/react/headless";
import {Wrapper as PopperWrapper} from "~/components/Popper";

import HeaderFilter from "../HeaderFilter";

import styles from "./CountFilter.module.scss";

const cx = classNames.bind(styles);

const items = [
    {
        title: "Name",
        children: {
            data: [
                {
                    title: "A-Z",
                    syntax: "a-z",
                },
                {
                    title: "Z-A",
                    syntax: "z-a",
                },
            ],
        },
    },
    {
        title: "Price",
        children: {
            data: [
                {
                    title: "High to Low",
                    syntax: "h-l",
                },
                {
                    title: "Low to High",
                    syntax: "l-h",
                },
            ],
        },
    },
    {
        title: "Quantity",
        children: {
            data: [
                {
                    title: "Ascending",
                    syntax: "asc",
                },
                {
                    title: "Descending",
                    syntax: "desc",
                },
            ],
        },
    },
];


function CountFilter({count = 0, setFilter, headerTitle, setHeaderTitle}) {
    const [history, setHistory] = useState([{data: items}]);
    const current = history[history.length - 1];
    const [typeSort, setTypeSort] = useState("");
    const [titleFilter, setTitleFilter] = useState("Filter");

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <div
                    className={cx("option")}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                            setHeaderTitle(item.title);
                        } else {
                            setTypeSort(item.title);
                            setFilter(item.syntax);
                            setTitleFilter(item.title);
                        }
                    }}
                >
                    {item.title}
                </div>
            );
        });
    };
    return (
        <div className={cx("product-manage")}>
            <div className={cx("product-count")}>
                {count} {count > 1 ? "Products" : "Product"}
            </div>
            <Tippy
                interactive
                delay={[0, 300]}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx("sort-options")} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {history.length > 1 && (
                                <HeaderFilter
                                    title={headerTitle}
                                    onBack={() => {
                                        setHistory((prev) => prev.slice(0, prev.length - 1));
                                        setTitleFilter("Filter");
                                    }}
                                />
                            )}
                            {renderItems()}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx("filter-product")}>
          <span
              className={
                  titleFilter === "Filter"
                      ? cx("sort-title")
                      : cx("sort-title-active")
              }
          >
            {titleFilter}
          </span>
                    <i
                        className={cx("fa-sharp fa-light fa-chevron-down", "down-icon")}
                    ></i>
                </div>
            </Tippy>
        </div>
    );
}

export default CountFilter;
