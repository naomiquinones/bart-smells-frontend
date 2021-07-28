import React, {useEffect} from 'react';

import Row from './Row';

import axios from 'axios'

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  const loadReports = async () => {
      await axios.get(`http://localhost:5000/reports`)
      .then(response => {
        console.log(response.data)
        setReports(response.data)
      }
        )
      .catch(error => console.log(error))
      .finally(() => console.log('finally'));
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <main>
      <h2>View Reports</h2>
      <table className="report-table" >
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
          {reports.map((report,index) =>
            <Row key={index} report={report} />
          )}
        </tbody>
      </table>
    </main>
  )
}

export default Reports;