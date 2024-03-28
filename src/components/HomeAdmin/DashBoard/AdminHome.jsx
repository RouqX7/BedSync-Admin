import React from "react";
import "./adminHome.scss";
import Navbar from "../../navbar/navbar";
import Sidebar from "../../sidebar/Sidebar";
import Widgets from "../../widgets/Widgets";
import Featured from "../../featured/Featured";
import Chart from "../../chart/Chart";
import Table from "../../table/Table";

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widgets type="user" />
          <Widgets type="ward" />
          <Widgets type="bed" />
          <Widgets type="patients" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Bed Transfers Last 6 months" aspect={3 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Tranactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
