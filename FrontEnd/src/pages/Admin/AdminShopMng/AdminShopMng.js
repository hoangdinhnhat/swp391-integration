import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminShopMng.module.scss";
import Sidebar from "../global/Sidebar";

import avatar from "~/assets/images/user-avatar.png";
import DataTable from "react-data-table-component";
import HeaderSeller from "~/layouts/components/HeaderSeller/HeaderSeller";

const cx = classNames.bind(styles);

const shopsRows = [
  {
    id: 1,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
  {
    id: 2,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
  {
    id: 3,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
  {
    id: 4,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
  {
    id: 5,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
  {
    id: 6,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
  {
    id: 7,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Banned",
  },
  {
    id: 8,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Banned",
  },
  {
    id: 9,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
  {
    id: 10,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Banned",
  },
  {
    id: 11,
    avatar: avatar,
    shopName: "Louis Vuiton",
    email: "anv@gmail.com",
    address: "Ho Chi Minh",
    package: "30 days",
    status: "Available",
  },
];

const usersColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    style: {
      fontsize: "16px",
    },
  },
  {
    name: "Avatar",
    cell: (row) => (
      <div>
        <img className={cx("avatar-img")} src={row.avatar} alt="avatar-img"/>
      </div>
    ),
  },
  {
    name: "Shop Name",
    selector: (row) => row.shopName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Address",
    selector: (row) => row.address,
  },
  {
    name: "Package",
    selector: (row) => row.package,
  },
  {
    name: "Status",
    cell: (row) => (
      <div>
        {row.status === "Available" && (
          <p className={cx("available-status")}>Available</p>
        )}
        {row.status === "Banned" && (
          <p className={cx("banned-status")}>Banned</p>
        )}
      </div>
    ),
  },
  {
    name: "Action",
    cell: (row) => (
      <div>
        {row.status === "Available" && (
          <button className={cx("ban_btn")} onClick={() => console.log(row)}>
            Ban
          </button>
        )}
        {row.status === "Banned" && (
          <button
            className={cx("recover_btn")}
            onClick={() => console.log(row)}
          >
            Recover
          </button>
        )}
      </div>
    ),
  },
];

const customStyles = {
  header: {
    style: {
      fontsize: "16px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f2f2f2",
      
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#fff",
    },
  },
  cells: {
    style: {
      padding: "10px",
      fontSize: "15px",
    },
  },
};

function AdminUserMng() {
  const [records, setRecords] = useState(shopsRows);
  const handlerFilter = (event) => {
    const newData = shopsRows.filter((row) =>
      row.shopName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  return (
    <>
      <HeaderSeller title="Admin" />
      <div className={cx("container")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("user-container")}>
          <div className={cx("user-table")}>
            <div className={cx("input-search")}>
              <input
                type="text"
                placeholder="Search shop"
                onChange={handlerFilter}
                className={cx("skw")}
              ></input>
            </div>

            <DataTable
              columns={usersColumns}
              data={records}
              selectableRows
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUserMng;
