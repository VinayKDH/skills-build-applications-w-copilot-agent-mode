import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = getApiEndpoint('users');

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users data:', data);
        setUsers(data.results || data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2 className="h4">Users</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.username || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{user.date_joined || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>Refresh</button>
      </div>
    </div>
  );
};

export default Users;
