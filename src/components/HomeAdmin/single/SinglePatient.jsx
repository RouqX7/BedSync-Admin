import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/navbar';
import { setCurrentPatient } from '../../state/patientSlice'; // Assuming setCurrentPatient action is defined
import { PatientColumns } from '../../datatableResource';
import Chart from '../../chart/Chart';
import List from '../../table/Table';

const SinglePatient = () => {
  const { id } = useParams(); // Assuming the route parameter is named patientId
  const dispatch = useDispatch();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/patients/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.error("Patient not found");
          } else {
            console.error("Error fetching patient data:", response.statusText);
          }
          return;
        }
        const data = await response.json();
        setPatientData(data);
        dispatch(setCurrentPatient(data)); // Dispatch setCurrentPatient action

      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [dispatch, id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Patient Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{patientData.firstName} {patientData.lastName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Date of Birth:</span>
                  <span className="itemValue">{patientData.dateOfBirth}</span>
                </div>
              
                <div className="detailItem">
                  <span className="itemKey">Contact Information:</span>
                  <span className="itemValue">{patientData.contactInformation}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Medical History:</span>
                  <span className="itemValue">{patientData.medicalHistory}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Patient Statistics" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Patient Details</h1>
          <List patientData={patientData} columns={PatientColumns} />
        </div>
      </div>
    </div>
  );
};

export default SinglePatient;
