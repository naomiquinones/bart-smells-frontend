import React, { useEffect } from "react";

import Row from "./Row";

import axios from "axios";

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  const loadReports = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/reports`)
      .then((response) => {
        // const sorted = response.data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        // setReports(sorted);
        setReports(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("Tried to get reports"));
  };

  useEffect(() => {
    loadReports();
  }, []);

  const vote = (reportId, vote) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/reports/${reportId}/votes`, {
        vote: vote,
      })
      .then((response) => {
        loadReports();
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("Sent vote"));
  };

  return (
    <>
      <h2>View Reports</h2>
      <table className="report-table">
        <caption>Reports from the past week</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Route</th>
            <th>Direction</th>
            <th>Car&nbsp;#</th>
            <th colSpan="2">Votes</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <Row key={index} report={report} vote={vote} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Reports;
