import "./datatable.scss";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { wardColumns } from "../../datatableResource";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilState } from "recoil"; // Assuming you have Recoil set up for state management
import { selectedHospitalState } from "../../../atoms/atoms";

const WardDatatable = () => {
  const [data, setData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalState); // Assuming you have Recoil set up for state management

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "wards"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'wards'), (snapshot) => {
      const wards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filteredWards = wards.filter(ward => {
        if (selectedHospital) {
          return ward.hospitalId === selectedHospital;
        } else {
          return true; // Return all wards if no hospital filter applied
        }
      });
      setData(filteredWards);
    }, (error) => {
      console.log(error);
    });

    return () => unsubscribe();
  }, [selectedHospital]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "wards", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
    <Link to={`/AdminWards/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Ward
        <Link to="/AdminWards/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={wardColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default WardDatatable;
