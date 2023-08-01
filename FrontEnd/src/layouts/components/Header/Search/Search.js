import classNames from "classnames/bind";
import {useEffect, useState} from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import {Wrapper as PropperWrapper} from "~/components/Popper";
import axios from "axios";
import {useDebounce} from "~/hook";

import styles from "~/layouts/components/Header/Header.module.scss";
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(true);

    const debounced = useDebounce(searchValue, 200);

    useEffect(() => {
        if (!debounced.trim()) {
            setShowResults([]);
            return;
        }

        //CALL API HERE
        axios
            .get("/api/v1/publics/product/search?keyword=" + debounced)
            .then((res) => {
                console.log(res.data);
                let searchResult = res.data.products.map(p => p.product.name).slice(-5)
                setSearchResult(searchResult)
            })
            .catch((e) => console.log(e));
    }, [debounced]);

    const handleChange = (e) => {
        const searchValues = e.target.value;
        if (!searchValues.startsWith(" ")) {
            setSearchValue(searchValues);
        }
    };

    const handleHideResults = () => {
        setShowResults(false);
    };

    return (
        <div className={cx("search-container")}>
            <HeadlessTippy
                visible={showResults && searchResult.length > 0}
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx("search-results")} tabIndex="-1">
                        <PropperWrapper>
                            <div className={cx("result-container")}>
                                <i className={cx("fa-light fa-box", "icon-box")}></i>
                                <span>
                  Search "<span>{debounced}</span>"
                </span>
                            </div>
                            {searchResult.map((p, index) => (
                                <Link
                                    key={index}
                                    to={`/search?search=${p}`}
                                    className={cx("search-item")}
                                >{p}</Link>
                            ))}
                        </PropperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResults}
            >
                <form action="/search" className={cx("search-bar")}>
                    <input hidden name="search" value={searchValue}/>
                    <input
                        type="text"
                        placeholder="Search your product from here"
                        spellCheck={true}
                        onChange={handleChange}
                        onFocus={() => setShowResults(true)}
                    ></input>
                    <button type="submit">
                        <i className={cx("fa-regular fa-magnifying-glass")}></i>
                    </button>
                </form>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
