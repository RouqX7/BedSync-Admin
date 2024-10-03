import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import "./datatable.scss";
import { selectedHospitalState } from "../../../atoms/atoms";
import { useRecoilState } from "recoil";
import { bedColumns } from "../../datatableResource";

const BedDatatableWithWards = () => {
  const [data, setData] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState("");
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalState); // Assuming you have Recoil set up for state management
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch wards for dropdown
    const fetchWards = async () => {
      const wardCollection = collection(db, "wards");
      const wardSnapshot = await getDocs(wardCollection);
      const wardList = wardSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWards(wardList);
    };

    fetchWards();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'beds'), (snapshot) => {
      const beds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filteredBeds = beds.filter(bed => {
        if (selectedHospital && selectedWardId) {
          return bed.hospitalId === selectedHospital && bed.wardId === selectedWardId;
        } else if (selectedHospital) {
          return bed.hospitalId === selectedHospital;
        } else if (selectedWardId) {
          return bed.wardId === selectedWardId;
        } else {
          return true; // Return all beds if no filters applied
        }
      });
      setData(filteredBeds);
    }, (error) => {
      console.log(error);
    });

    return () => unsubscribe();
  }, [selectedHospital, selectedWardId]);

  const handleDelete = async (id, wardId) => {
    try {
      // Delete the bed from the backend
      const response = await fetch(
        `http://localhost:8081/api/beds/delete/${id}/${wardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete bed with ID ${id}`);
      }

      // Update the local state after successful deletion
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting bed:", error.message);
      // Handle the error as needed
    }
  };

  const handleAddBed = () => {
    console.log("Selected Ward ID:", selectedWardId);

    if (!selectedWardId) {
      // Display a notification
      toast.error("Please select a ward before adding a bed.");
    } else {
      // Navigate to the "Add Bed" page
      navigate(`/AdminBeds/new/${selectedWardId}`);
    }
  };

  const bedActionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link
            to={`/AdminBeds/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id, params.row.wardId)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ToastContainer />
      <div className="datatable">
        <div className="datatableTitle">
          All Beds
          <div className="wardDropdown">
            <label htmlFor="wardId">Select Ward:</label>
            <select
              id="wardId"
              value={selectedWardId}
              onChange={(e) => setSelectedWardId(e.target.value)}
            >
              <option value="">All Wards</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className="link" onClick={handleAddBed}>
            Add Bed
          </div>
        </div>
        <DataGrid
          className="datagrid"
          rows={data.map((bed) => ({
            ...bed,
            id: bed.id, // Ensure each row has a unique id property
          }))}
          columns={bedColumns.concat(bedActionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default BedDatatableWithWards;
