import "./list.scss";
import React from "react";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/navbar";
import WardDatatable from "../datatable/WardDatatable";

const ListWards = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <WardDatatable />
      </div>
    </div>
  );
};

export default ListWards;
