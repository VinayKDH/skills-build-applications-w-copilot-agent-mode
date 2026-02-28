import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = getApiEndpoint('activities');

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities data:', data);
        setActivities(data.results || data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2 className="h4">Activities</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={idx}>
                <td>{activity.name || '-'}</td>
                <td>{activity.type || '-'}</td>
                <td>{activity.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>Refresh</button>
      </div>
    </div>
  );
};

export default Activities;
