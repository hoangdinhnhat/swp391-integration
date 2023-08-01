import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ReportDetail from "./ReportDetail";
import styles from "./Report.module.scss";

const cx = classNames.bind(styles);

const reportsProduct = [
  "Prohibited products (wild animals, 18+, ...)",
  "Fake product",
  "Products of unknown origin",
  "Products with signs of fraud",
  "Product image is not clear",
  "The product name does not match",
  "Other...",
];

const reportShop = [
  "Prohibited item",
  "Scam",
  "Counterfeit",
  "Offensive chat messages / images / videos",
  "Directing transaction outside of Shopee",
  "Data privacy violation",
  "Posting pornographic, obscene and vulgar content",
  "Other...",
];

function Report({ closeReport, type, product, shop }) {
  const [openReport, setOpenReport] = useState(false);
  const [titleReport, setTitleReport] = useState("");
  const [arrayReport, setArrayReport] = useState(reportsProduct);

  useEffect(() => {
    if (type === "product") {
      setArrayReport(reportsProduct);
    } else {
      setArrayReport(reportShop);
    }
  }, []);

  const handleReport = (report) => {
    setOpenReport(true);
    setTitleReport(report);
  };
  return (
    <>
      {openReport ? (
        <ReportDetail
          titleReport={titleReport}
          backToReport={setOpenReport}
          product={product}
          shop={shop}
          closeSubReport={closeReport}
          type={type}
        />
      ) : (
        <div className={cx("overlay")}>
          <div className={cx("report-popup")}>
            <div className={cx("report_container")}>
              <div className={cx("report_header")}>
                <span className={cx("report_reason")}>Select a Reason</span>
                <i
                  className={cx("fa-light fa-xmark", "x-icon")}
                  onClick={() => closeReport(false)}
                ></i>
              </div>
              <ul className={cx("report_list")}>
                {arrayReport.map((report, index) => (
                  <li
                    className={cx("report_item")}
                    key={index}
                    onClick={() => handleReport(report)}
                  >
                    {report}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Report;
