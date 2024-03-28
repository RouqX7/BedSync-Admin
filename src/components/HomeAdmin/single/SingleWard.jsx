import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/navbar';
import Chart from '../../chart/Chart';
import List from '../../table/Table';
import "./single.scss";
import { setCurrentWard } from '../../state/wardSlice';
import { wardColumns } from '../../datatableResource'; // Import wardColumns

const SingleWard = () => {
  const { wardId: wardId } = useParams();
  const dispatch = useDispatch();
  const [wardData, setWardData] = useState(null);

  useEffect(() => {
    console.log('wardId:', wardId);
    const fetchWardData = async () => {
      console.log('Component mounted');
      try {
        const response = await fetch(`http://localhost:8081/api/wards/${wardId}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.error("Ward not found");
          } else {
            console.error("Error fetching ward data:", response.statusText);
          }
          return;
        }
        const data = await response.json();
        setWardData(data);
        dispatch(setCurrentWard(data)); // Dispatch setCurrentWard action

      } catch (error) {
        console.error("Error fetching ward data:", error);
      }
    };

    fetchWardData(); // Moved inside the outer useEffect
  }, [dispatch, wardId]);

  if (!wardData) {
    return <div>Loading...</div>; // Moved inside the component
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Ward Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{wardData.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Ward Type:</span>
                  <span className="itemValue">{wardData.wardType}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{wardData.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Responsible Department:</span>
                  <span className="itemValue">{wardData.responsibleDepartment}</span>
                </div>
                <div className="detailItem">
                    <span className="itemKey">Capacity: </span>
                    <span className="itemValue">{wardData.capacity}</span>
                </div>
                <div className="detailItem">
                    <span className="itemKey">Total Beds</span>
                    <span className="itemValue">{wardData.totalBeds}</span>
                </div>
                <div className="detailItem">
                    <span className="itemKey">Current Occupancy</span>
                    <span className="itemValue">{wardData.currentOccupancy}</span>
                </div>
                <div className="detailItem">
                    <span className="itemKey">Status</span>
                    <span className="itemValue">{wardData.status}</span>
                </div>
                <div className="detailItem">
                    <span className="itemKey">Available Beds</span>
                    <span className="itemValue">{wardData.availableBeds}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Ward Statistics" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Ward Details</h1>
          <List wardData={wardData} columns={wardColumns} />
        </div>
      </div>
    </div>
  );
};

export default SingleWard;
