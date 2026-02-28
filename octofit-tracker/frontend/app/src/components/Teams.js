import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = getApiEndpoint('teams');

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams data:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2 className="h4">Teams</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={idx}>
                <td>{team.name || '-'}</td>
                <td>{team.members ? team.members.length : '-'}</td>
                <td>{team.score || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>Refresh</button>
      </div>
    </div>
  );
};

export default Teams;
