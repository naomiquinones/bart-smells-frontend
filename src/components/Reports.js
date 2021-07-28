import React, {useEffect} from 'react';

import Row from './Row';

import axios from 'axios'

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  const loadReports = async () => {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports`)
      .then(response => {
        console.log(response.data)
        const sorted = response.data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        console.log(sorted);
        // setReports(sorted);
        setReports(response.data);
      }
        )
      .catch(error => console.log(error))
      .finally(() => console.log('finally'));
  }

  useEffect(() => {
    loadReports();
  }, []);

  const vote = (reportId, vote) => {
    console.log({reportId, vote})
    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/reports/${reportId}/votes`, {vote: vote})
    .then(response => {
      console.log(response.data)
      loadReports();
    })
    .catch(error => console.log(error))
    .finally(() => console.log('finally'));
  }

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
            <Row key={index} report={report} vote={vote} />
          )}
        </tbody>
      </table>
    </main>
  )
}

export default Reports;