import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/navbar";
import Chart from "../../chart/Chart";
import List from "../../table/Table";
import "./single.scss";
import { bedColumns } from "../../datatableResource";
import { useDispatch } from "react-redux";
import { setCurrentBed } from "../../state/bedSlice";

const SingleBed = () => {
  const { bedId } = useParams();
  const dispatch = useDispatch();
  const [bedData, setBedData] = useState(null);

  useEffect(() => {
    console.log("bedId:", bedId);
    const fetchBedData = async () => {
      console.log("Component mounted");
      try {
        const response = await fetch(`http://localhost:8081/api/beds/${bedId}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.error("Beds not found");
          } else {
            console.error("Error fetching bed data:", response.statusText);
          }
          return;
        }
        const data = await response.json();
        setBedData(data);
        dispatch(setCurrentBed(data));
      } catch (error) {
        console.error("Error fetching bed data:", error);
      }
    };

    fetchBedData(); // Moved inside the outer useEffect
  }, [dispatch, bedId]);

  if (!bedData) {
    return <div>Loading...</div>; // Moved inside the component
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Bed Information</h1>
            <div className="item">
              <div className="details">
              <h3 className="ItemKey">Bed Number</h3>
                <h4 className="ItemValue">{bedData.bedNumber}</h4>
                <div className="detailItem">
                  <span className="itemKey">Bed Type:</span>
                  <span className="itemValue">{bedData.bedType}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Available:</span>
                  <span className="itemValue">
                    {bedData.available ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Ward Statistics" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Bed Details</h1>
          <List bedData={bedData} columns={bedColumns} />
        </div>
      </div>
    </div>
  );
};

export default SingleBed;
