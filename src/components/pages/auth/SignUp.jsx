import React, { useState, useContext, useEffect } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db,storage } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRecoilState } from "recoil";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [password, setPassword] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [address, setAddress] = useState("");
  const [permissions, setPermissions] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null); // State for file upload
  const [img, setImg] = useState(null); // State for profile picture

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalsCollection = collection(db, "hospitals");
        const hospitalsSnapshot = await getDocs(hospitalsCollection);
        const hospitalsList = hospitalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHospitals(hospitalsList);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Upload profile picture to Firebase Storage
      if (file) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytesResumable(storageRef, file);
      }

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        role: role,
        permissions: permissions,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
        hospitalId: selectedHospital,
        img: img || "",
        timeStamp: serverTimestamp(),

      });

      console.log("User details saved to Firestore successfully");
      navigate("/sign-in");
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
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
        <input
          type="text"
          placeholder="Enter your First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Permissions"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="admin">Admin</option>
        </select>
        <select onChange={(e) => setSecurityQuestion(e.target.value)}>
          <option value="">Select Security Question</option>
          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
          <option value="What city were you born in?">What city were you born in?</option>
          <option value="What is the name of your first pet">What is the name of your first pet?</option>
          <option value="What is your favorite movie?">What is your favorite movie?</option>
          <option value="What is your favorite food?">What is your favorite food?</option>
        </select>
        <input
          type="text"
          placeholder="Security Answer"
          value={securityAnswer}
          onChange={(e) => setPermissions(e.target.value)}
        />

        <select onChange={(e) => setSelectedHospital(e.target.value)}>
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          ))}
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
