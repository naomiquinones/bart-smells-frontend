import React, { useState, useEffect, useCallback } from "react";
import "./Dashboard.css";

import axios from "axios";

const Dashboard = ({ current_rider_id = 3 }) => {
  const [riderData, setRiderData] = useState(null);

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/riders/${current_rider_id}`)
      .then((response) => {
        setRiderData(response.data.rider);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log());
  }, [current_rider_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                {key}: {report[key]}
              </p>
            );
          });
          {/* return ([heading, details]);
           */}
           return (
             <>
               {heading} {details}
             </>
           )
        })}
      </div>
      )}
    </>
  );
};

export default Dashboard;
