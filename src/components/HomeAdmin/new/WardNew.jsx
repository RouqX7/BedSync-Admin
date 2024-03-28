import React, { useEffect, useState } from "react";
import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"; // Import Recoil hooks
import { selectedHospitalState } from "../../../atoms/atoms"; // Import the Recoil atom for storing hospital ID

const WardNew = ({ inputs, title, wardId: wardId }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [selectedHospitalId, setSelectedHospitalId] = useRecoilState(selectedHospitalState);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      if (!file) return;

      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
        },
        (error) => {
          console.error("Error uploading file:", error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    for (const input of inputs) {
      if (!data[input.id] && input.id !== "img") {
        alert(`Please enter ${input.label}`);
        return false;
      }
    }
    return true;
  };

  const createWard = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't proceed with form submission if validation fails
    }

    try {
      const response = await fetch(`http://localhost:8081/api/wards/create-ward/${selectedHospitalId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: wardId,
          ...data,
          img: data.img || "", // Ensure img is present, even if not uploaded
        }),
      });

      if (!response.ok) {
        throw new Error(`Error creating ward: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Ward created successfully:", responseData);
      navigate(-1);
    } catch (error) {
      console.error("Error creating ward:", error.message);
      // Handle the error as needed
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={createWard}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput} />
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardNew;
