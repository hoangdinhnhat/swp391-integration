import classNames from "classnames/bind";

import HeaderSeller from "~/layouts/components/HeaderSeller";
import SideBar from "~/pages/SellerPortal/SideBar";
import NavBar from "../NavBar";
import CountFilter from "../CountFilter";
import Table from "../Table";

import styles from "./Pending.module.scss";
import {useEffect} from "react";

const cx = classNames.bind(styles);

const products = [
    {
        productId: 0,
        productStatus: "Pending",
        listImage: [
            "https://m.media-amazon.com/images/I/81cR4gm3+aL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71+4X8orK7L._AC_SL1500_.jpg",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        productName: "Prevue Pet Products Travel Carrier for Birds, Black",
        productCategory: "Bird Cage",
        productPrice: 1200,
        productQuantity: 100,
        productDescription:
            "Easy to Use: The bird travel cage is an ideal solution for short-term traveling or emergency situations to the vet. The bird-proof door lock prevents your bird from escaping while the comfortable design helps your pet feel at home.",
    },
    {
        productId: 1,
        productStatus: "Pending",
        listImage: [
            "https://m.media-amazon.com/images/I/71tMJsLvMSL._AC_SL1200_.jpg",
            "https://m.media-amazon.com/images/I/61NweC6UrjL._AC_SL1200_.jpg",
            "https://m.media-amazon.com/images/I/61G1aiEd2aL._AC_SL1200_.jpg",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        productName:
            "FOIBURELY Bird Nest Canary Finch Parrot Nest with Felt（4.5 inches）",
        productCategory: "Bird Accessory",
        productPrice: 2000,
        productQuantity: 55,
        productDescription:
            "Products include: a multi-functional plastic frame, a bird's nest and a wool felt mat. Fine workmanship, imitating the natural bird's nest, wool felt cushion is comfortable, warm and breathable.",
    },
    {
        productId: 2,
        productStatus: "Pending",
        listImage: [
            "https://m.media-amazon.com/images/I/71SwSh8H46L._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61r1QAoldBL._AC_SL1000_.jpg",
            "https://m.media-amazon.com/images/I/61b+yBJdFyL._AC_SL1000_.jpg  ",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        productName:
            "Pretty Bird International Species Specific African Bird Food- 8-Pound",
        productCategory: "Bird Food",
        productPrice: 890,
        productQuantity: 10,
        productDescription:
            "Premium Bird Food Is Designed For Most African Species, Medium And Large Conures, Contains Higher Calcium  14-Percent Protein And 8-Percent Fat In Medium Sized Morsels Available In 8-Pounds",
    },
    {
        productId: 3,
        productStatus: "Pending",
        listImage: [
            "https://m.media-amazon.com/images/I/81cR4gm3+aL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71+4X8orK7L._AC_SL1500_.jpg",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        productName: "Prevue Pet Products Travel Carrier for Birds, Black",
        productCategory: "Bird Cage",
        productPrice: 1200,
        productQuantity: 100,
        productDescription:
            "Easy to Use: The bird travel cage is an ideal solution for short-term traveling or emergency situations to the vet. The bird-proof door lock prevents your bird from escaping while the comfortable design helps your pet feel at home.",
    },
    {
        productId: 4,
        productStatus: "Pending",
        listImage: [
            "https://m.media-amazon.com/images/I/71tMJsLvMSL._AC_SL1200_.jpg",
            "https://m.media-amazon.com/images/I/61NweC6UrjL._AC_SL1200_.jpg",
            "https://m.media-amazon.com/images/I/61G1aiEd2aL._AC_SL1200_.jpg",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        productName:
            "FOIBURELY Bird Nest Canary Finch Parrot Nest with Felt（4.5 inches）",
        productCategory: "Bird Accessory",
        productPrice: 2000,
        productQuantity: 55,
        productDescription:
            "Products include: a multi-functional plastic frame, a bird's nest and a wool felt mat. Fine workmanship, imitating the natural bird's nest, wool felt cushion is comfortable, warm and breathable.",
    },
];

function Pending() {
    useEffect(() => {
        document.title = "Seller Centre";
    }, []);
    return (
        <>
            <HeaderSeller title="Product Pending"/>
            <div className={cx("product_wrapper")}>
                <div className={cx("product_sidebar")}>
                    <SideBar/>
                </div>
                <div className={cx("product_container")}>
                    <div className={cx("product_content")}>
                        <NavBar/>
                        <div className={cx("product-search")}>
                            <div className={cx("product-type")}>Product name</div>
                            <form className={cx("form-search")}>
                                <div className={cx("search-input")}>
                                    <input
                                        type="text"
                                        placeholder="Product name"
                                        spellCheck={false}
                                        className={cx("input")}
                                    />
                                    <i
                                        className={cx(
                                            "fa-light fa-magnifying-glass",
                                            "search-icon"
                                        )}
                                    ></i>
                                </div>
                                <button type="submit" className={cx("search-btn")}>
                                    Search
                                </button>
                            </form>
                        </div>
                        <CountFilter count={products.length}/>
                        <div className={cx("product-table")}>
                            <Table products={products}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pending;
