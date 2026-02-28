import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = getApiEndpoint('leaderboard');

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard data:', data);
        setLeaders(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2 className="h4">Leaderboard</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={idx}>
                <td>{leader.name || '-'}</td>
                <td>{leader.score || '-'}</td>
                <td>{leader.rank || idx + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>Refresh</button>
      </div>
    </div>
  );
};

export default Leaderboard;
