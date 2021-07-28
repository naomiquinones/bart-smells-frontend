import React, {useState, useEffect, useCallback} from 'react';

import axios from 'axios';

const Dashboard = ({rider_id}) => {
  const [data, setData] = useState(null);

  const fetchData = useCallback(() => {
    axios.get(`/api/riders/${rider_id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, [rider_id]);

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <h2>Dashboard</h2>
  )
}

export default Dashboard;