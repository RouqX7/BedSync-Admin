import Sidebar from "../../../components/sidebar/Sidebar";
import "./new.scss";
import Navbar from "../../../components/navbar/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil"; // Import useRecoilValue for retrieving Recoil state
import { selectedHospitalState } from "../../../atoms/atoms"; // Assuming correct path to the Recoil atom


const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // Define state for role
  const [securityQuestion, setSecurityQuestion] = useState(""); // Define state for security question
  const selectedHospital = useRecoilValue(selectedHospitalState); // Retrieve selected hospital from Recoil

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    let value = e.target.value;
    
    // Convert role input to lowercase if it's the role field
    if (id === "role") {
      setRole(value);
    }
    
    // If the input field is for security question, set it using setSecurityQuestion
    if (id === "securityQuestion") {
      setSecurityQuestion(value);
    }
    
    setData({ ...data, [id]: value });
  };
  

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Register user using Firebase Authentication
      const authResult = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Step 2: Save additional user data to Firestore
      const user = {
        userId: authResult.user.uid,
        email: authResult.user.email,
        firstName: data.firstName,
        lastName: data.lastname,
        address: data.address,
        role: role, // Use role state directly
        phoneNumber: data.phoneNumber,
        securityQuestion: securityQuestion, // Use securityQuestion state directly
        securityAnswer: data.securityAnswer,
        permissions: data.permissions,
        img: data.img || "",
        hospitalId: selectedHospital,
      };

      await setDoc(doc(db, "users", user.userId), {
        ...user,
        timeStamp: serverTimestamp(),
      });

      // Navigate to a different page or perform other actions as needed
      navigate(-1);
    } catch (err) {
      console.log(err);
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
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select id={input.id} onChange={handleInput}>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  )}
                </div>
              ))}
              <div className="formInput"></div>
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

export default New;
