import React from "react";
import { Navigate } from "react-router-dom";
import Modal from "./Modal";
import "./Dashboard.css";

import axios from "axios";

const Dashboard = ({ riderData, isLoggedIn, getRiderData, setRiderData, getBARTRouteList  }) => {
  const [errorMsg, setErrorMsg] = React.useState("");

  const [showModal, setShowModal] = React.useState(false);
  const showTheModal = () => {
    setShowModal(true);
  };
  const hideTheModal = () => {
    setShowModal(false);
  };

  const deleteReport = (reportId) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BACKEND_URL}/reports/${reportId}`)
      .then((response) => {
        console.log("report deleted", response);
        getBARTRouteList();
        getRiderData();
        return true;
      })
      .catch((e) => {
        console.log(e);
        setErrorMsg(e.response.data.error);
        return false;
      })
      .finally(() => {
        console.log("Tried to delete");
      });
  };
  const cancelAccount = () => {
    console.log("cancelling account for", riderData.name);
    axios
      .delete(`${import.meta.env.VITE_APP_BACKEND_URL}/riders/${riderData.id}`)
      .then((response) => {
        console.log("account deleted", response);
        setRiderData(null);
        return true;
      })
      .catch((e) => {
        console.log(e);
        setErrorMsg(e.response.data.error);
        return false;
      })
      .finally(() => {
        console.log("Tried to delete user");
      });
  };

  return !isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <>
      <h2>Dashboard</h2>
      {riderData && (
        <div className="user-info">
          <Modal show={showModal} handleClose={hideTheModal}>
            <section className="user-info-section">
              <h3>User Info</h3>
              <p>Name: {riderData.name}</p>
              <p>Email: {riderData.email}</p>
              <p>Number of reports: {riderData.reports.length}</p>
              <button className="delete-account-button" onClick={() => cancelAccount()}>Delete my account</button>
              {errorMsg && <p className="error-msg" >{errorMsg}</p>}
            </section>
          </Modal>
          <button
            type="button"
            className="edit-user-button"
            onClick={showTheModal}
          >
            Edit/Cancel Account
          </button>
          <h3>
            {riderData.name}
            <span>{riderData.email}</span>
          </h3>
          <section className="reports">
            <h4>My Reports</h4>
            {riderData.reports.map((report, index) => {
              const heading = (
                <h5 key={index}>
                  Report #{index + 1}
                  <button
                    className="delete-report"
                    onClick={() => deleteReport(report.id)}
                  >
                    Delete
                  </button>
                </h5>
              );
              const details = Object.keys(report).map((key) => {
                return (
                  key !== "id" &&
                  key !== "user_id" && (
                    <p key={key}>
                      <strong>{key}:</strong> {report[key]}
                    </p>
                  )
                );
              });
              return [heading, details];
            })}
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;
