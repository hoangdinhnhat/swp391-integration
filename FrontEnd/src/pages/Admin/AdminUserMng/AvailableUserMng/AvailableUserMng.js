import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AvailableUserMng.module.scss";
import Sidebar from "../../global/Sidebar";
import DataTable from "react-data-table-component";
import UserMngNav from "../../AdminUserMng/UserMngNav";
import Topbar from "../../global/Topbar";
import axios from "axios";

const cx = classNames.bind(styles);

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
    // selector: (row) => row.avatar,
    // sortable: true,
    cell: (row) => (
      <div>
        <img className={cx("avatar-img")} src={row.avatar} alt="img-avatar" />
      </div>
    ),
  },
  {
    name: "Full Name",
    selector: (row) => row.fullName,
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
          <button
            className={cx("ban_btn")}
            onClick={() => {
              axios
                .post("/api/v1/admin/action/user/" + row.id + "?action=BAN")
                .then((res) => window.location.reload())
                .catch((e) => console.log(e));
            }}
          >
            Ban
          </button>
        )}
        {row.status === "Banned" && (
          <button
            className={cx("recover_btn")}
            onClick={() => {
              axios
                .post("/api/v1/admin/action/user/" + row.id + "?action=RECOVER")
                .then((res) => window.location.reload())
                .catch((e) => console.log(e));
            }}
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
      width: "100px",
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

function AvailableUserMng() {
  const [search, setSearch] = useState([]);
  const [records, setRecords] = useState([]);
  const handleaFilter = (event) => {
    const newData = records.filter((row) =>
      row.fullName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearch(newData);
  };

  useEffect(() => {
    axios
      .get("/api/v1/admin/management/user")
      .then((res) => {
        console.log(res.data);
        let mappedUser = res.data.map((item) => {
          let mapped = {
            id: item.id,
            avatar: item.imageurl,
            fullName: item.firstname + " " + item.lastname,
            email: item.email,
            address: item.defaultReceiveInfo
              ? item.defaultReceiveInfo.province.name
              : "",
            status: item.enabled ? "Available" : "Banned",
          };
          return mapped;
        });
        setRecords(mappedUser.filter((item) => item.status === "Available"));
        setSearch(mappedUser.filter((item) => item.status === "Available"));
      })
      .catch((e) => console.log(e.response.status));
  }, []);

  return (
    <div className={cx("user-wrapper")}>
      <div className={cx("topbar")}>
        <Topbar />
      </div>
      <div className={cx("container")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("user-container")}>
          <div className={cx("nav-bar")}>
            <UserMngNav />
          </div>
          <div className={cx("user-table")}>
            <div className={cx("input-search")}>
              <input
                type="text"
                placeholder="Search user"
                onChange={handleaFilter}
                className={cx("skw")}
              ></input>
            </div>
            <DataTable
              columns={usersColumns}
              data={search}
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableUserMng;
