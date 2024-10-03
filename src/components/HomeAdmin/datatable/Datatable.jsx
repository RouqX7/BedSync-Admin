import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase';
import { userColumns } from '../../datatableResource';
import HospitalSelector from '../../../HospitalSelector';
import { selectedHospitalState } from '../../../atoms/atoms';
import { useRecoilState } from "recoil";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalState);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      console.log("All users from Firestore:", list); // Log all users fetched from Firestore
      setData(list);
    }, (error) => {
      console.log(error);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  console.log("Selected Hospital:", selectedHospital); // Log the selected hospital ID

  const filteredData = data.filter(user => user.hospitalId === selectedHospital);

  console.log("Filtered Data:", filteredData); // Log the filtered data

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleView = () => {
          // Navigate to the Single route with the user's data
          navigate(`/AdminUsers/${params.row.id}`);
        };
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleView(params.row.id)}
            >
              View
            </div>
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
        Add New User
        <Link to="/AdminUsers/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
