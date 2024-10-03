import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import {  useRecoilState } from "recoil";
import { selectedHospitalState } from "../../../atoms/atoms";



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedHospital, setSelectedHospital] = useRecoilState(
    selectedHospitalState
  );
  const [hospitals, setHospitals] = useState([]); // useRecoil here
  const navigate = useNavigate();

    const signIn = async (e) => {
      e.preventDefault();

      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("User:", user);

          // Fetch user data from the database to get the role
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
        

          if (userDocSnap.exists()) {
              const userData = userDocSnap.data();    
              const hospitalDocRef = doc(db,"hospitals",userData.hospitalId)
              const hospitalDocSnap = await getDoc(hospitalDocRef);

              if(hospitalDocSnap.exists()){
                const hosptialData = hospitalDocSnap.data();
                setSelectedHospital(hosptialData)
              }
              
              console.log("User Data:", userData);

              if (userData && userData.role) {
                setSelectedHospital(userData.hospitalId)
                  const role = userData.role;
                  console.log("User Role:", role);

                  // Check if the user has the role "admin"
                  if (role === "admin") {
                      // Redirect the user to the appropriate page based on their role
                      navigate("/");
                  } else {
                      console.log("Access denied. User is not an admin.");
                  }
              } else {
                  console.log("User data or role not found.");
              }
          } else {
              console.log("User document not found.");
          }
      } catch (error) {
          console.log("Error signing in:", error.message);
      }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
