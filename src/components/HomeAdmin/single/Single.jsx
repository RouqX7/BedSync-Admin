import React, { useEffect, useState } from 'react';
import "./single.scss";
import { useParams } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/navbar';
import Chart from '../../chart/Chart';
import List from '../../table/Table';
import { userColumns } from '../../datatableResource'; // Import userColumns
import { userInputs } from '../../formSource'; // Import userInputs

const Single = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/${uid}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.error("User not found");
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
        return;
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, [uid]);
  

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={userData.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{`${userData.firstName} ${userData.lastName}`}</h1>
                {userInputs.map((input) => (
                  <div className="detailItem" key={input.id}>
                    <span className="itemKey">{input.label}:</span>
                    <span className="itemValue">{userData[input.id]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List userData={userData} columns={userColumns} />
        </div>
      </div>
    </div>
  );
};

export default Single;
