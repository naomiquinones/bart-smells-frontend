import React from 'react';

const Reports = () => {
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
            <th>Train Direction</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1/1/2017</td>
            <td>New Report</td>
            <td>This is a new report</td>
            <td>Richmond/Fremont -&gt; Fremont</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}

export default Reports;