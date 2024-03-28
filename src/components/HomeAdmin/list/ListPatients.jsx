import "./list.scss";
import React from "react";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/navbar";
import PatientDatatable from "../datatable/PatientDatatable";

const ListBeds = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
         <PatientDatatable/>
      </div>
    </div>
  );
};

export default ListBeds;
