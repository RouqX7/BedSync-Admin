import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import List from "./components/HomeAdmin/list/List";
import ListWards from "./components/HomeAdmin/list/ListWards";

import New from "./components/HomeAdmin/new/New";
import Single from "./components/HomeAdmin/single/Single";
import AdminHome from "./components/HomeAdmin/DashBoard/AdminHome";

import {
  wardInputs,
  userInputs,
  bedInputs,
  patientInputs,
} from "./components/formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./components/context/darkModeContext";
import {
  PatientColumns,
  bedColumns,
  userColumns,
  wardColumns,
} from "./components/datatableResource";
import WardNew from "./components/HomeAdmin/new/WardNew";
import SingleWard from "./components/HomeAdmin/single/SingleWard";
import SingleBed from "./components/HomeAdmin/single/SingleBed";
import ListBeds from "./components/HomeAdmin/list/ListBeds";
import BedNew from "./components/HomeAdmin/new/BedNew";
import ListPatients from "./components/HomeAdmin/list/ListPatients";
import PatientNew from "./components/HomeAdmin/new/PatientNew";
import SinglePatient from "./components/HomeAdmin/single/SinglePatient";
import CreateHospitalForm from "./components/pages/CreateHospitalForm";
import SignIn from "./components/pages/auth/SignIn" ;
import { RecoilRoot } from "recoil"; // Import RecoilRoot
import SignUp from "./components/pages/auth/SignUp";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/AdminUsers">
              <Route index element={<List />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
              <Route
                path=":uid"
                element={<Single userColumns={userColumns} />}
              />
            </Route>
            <Route path="/AdminWards">
              <Route index element={<ListWards />} />
              <Route
                path="new"
                element={<WardNew inputs={wardInputs} title="Add New Ward" />}
              />
              <Route
                path=":wardId"
                element={<SingleWard wardColumns={wardColumns} />}
              />
            </Route>
            <Route path="/AdminBeds">
              <Route
                path="new/:wardId"
                element={<BedNew inputs={bedInputs} title="Add New Bed" />}
              />
              <Route
                path=":bedId/*"
                element={<SingleBed bedColumns={bedColumns} />}
              />
              <Route index element={<ListBeds />} />
            </Route>

            <Route path="/AdminPatients">
              <Route index element={<ListPatients />} />
              <Route
                path="new"
                element={
                  <PatientNew inputs={patientInputs} title="Add New Ward" />
                }
              />
              <Route
                path=":id"
                element={<SinglePatient patientColumns={PatientColumns} />}
              />
            </Route>

            <Route path="/hospital-form" element={<CreateHospitalForm />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
