import React from "react";
import "./Dashboard.css";
import Vote from "./Vote";

const Dashboard = ({riderData}) => {
  console.log(riderData);

  return (
    <>
      <h2>Dashboard</h2>
      {riderData && (
      <div className="user-info">
        <h3>
          {riderData.name}
          <span>{riderData.email}</span>
        </h3>
        <h4>My Reports</h4>
        {riderData.reports.map((report, index) => {
          const heading = <h5>Report #{index + 1}</h5>
          const details = Object.keys(report).map((key) => {
            return (
              key !== "id" && key !== "user_id" &&
              <p key={key}>
                <strong>{key}:</strong> {report[key]}
              </p>
            );
          });
          return ([heading, details]);
        })}
      </div>
      )}
    </>
  );
};

export default Dashboard;
