import "./list.scss";
import React from "react";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/navbar";
import  BedDatatableWithWards from "../datatable/bedDatatableWithWards";

const ListBeds = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
         <BedDatatableWithWards/>
      </div>
    </div>
  );
};

export default ListBeds;
