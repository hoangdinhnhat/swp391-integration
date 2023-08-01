import classNames from "classnames/bind";

import styles from "./TopSale.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function TopSale() {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios.get("/api/v1/shop/products?page=" + page)
            .then(res => setProducts(res.data))
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            {products.map((product) => (
                <div className={cx("product")} key={product.id}>
                    <div className={cx("product-info")}>
                        <img
                            src={product.images && product.images[0].url}
                            alt="product-img"
                            className={cx("product-img")}
                        />
                        <div className={cx("product-detail")}>
                            <div className={cx("product-name")}>{product.name}</div>
                            <div className={cx("product-price")}>${product.price}</div>
                        </div>
                    </div>
                    <div className={cx("sold")}>
                        {(() => {
                            let rs = "";
                            if (product.sold >= 1000) {
                                const sold = product.sold / 1000;
                                const rounded = Math.round(sold * 10) / 10;
                                return (rs += rounded + "k");
                            } else {
                                return (rs += product.sold);
                            }
                        })()}{" "}
                        Sold
                    </div>
                </div>
            ))}
        </>
    );
}

export default TopSale;
