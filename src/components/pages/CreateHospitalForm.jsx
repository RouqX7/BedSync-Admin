import React, { useState } from "react";
import "../pages/CreateHospitalForm.scss"; 


function CreateHospitalForm() {
  const [hospitalData, setHospitalData] = useState({
    name: "",
    location: "",
    capacity: 0,
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({
      ...hospitalData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/hospitals/create-hospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospitalData),
      });
      if (!response.ok) {
        throw new Error("Failed to create hospital");
      }
      console.log("Hospital created");
      navigate("/sign-up");
      // Add success message or redirect to another page
    } catch (error) {
      console.error("Error creating hospital:", error);
      // Add error message
    }
  };

  return (
    <div className="form-container">
      <h2>Create Hospital</h2>
      <form onSubmit={handleSubmit} className="hospital-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={hospitalData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={hospitalData.location}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more input fields for other hospital attributes */}
        <button type="submit">Create Hospital</button>
      </form>
    </div>
  );
}

export default CreateHospitalForm;
