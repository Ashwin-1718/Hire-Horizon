import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });

        // ✅ Filter out admin users
        const nonAdminUsers = usersRes.data.users.filter((u) => u.role !== 'admin');
        setUsers(nonAdminUsers);

        const appsRes = await axios.get('http://localhost:5000/api/admin/applications', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setApplications(appsRes.data);
      } catch (err) {
        console.error('Failed to fetch admin data', err);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setUsers(users.filter((u) => u._id !== userId));
        alert('User deleted successfully');
      } catch (err) {
        console.error('Failed to delete user', err);
        alert('Failed to delete user');
      }
    }
  };

  const handleUpdateStatus = async (userId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
        { status }, // sending status only
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
  
      const updatedUser = response.data.user;
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, status: updatedUser.status } : u
        )
      );
      alert('✅ User status updated successfully');
    } catch (err) {
      console.error('❌ Failed to update user status:', err.response?.data || err.message);
      alert('Failed to update user status');
    }
  };
  

  return (
    <section className="admin__container">
      <h2 className="admin__header">Admin Dashboard</h2>
      <div className="admin__welcome">
        <p>Welcome, {user?.name} (Admin)!</p>
        <button className="logout__btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Users Section */}
      <h3 className="section__header">Manage Users</h3>
      {users.length === 0 ? (
        <p className="no__data">No users found.</p>
      ) : (
        <div className="users__grid">
          {users.map((u) => (
            <div key={u._id} className="user__card">
              <h4>{u.name}</h4>
              <p>Email: {u.email}</p>
              <p>Status: {u.status || 'N/A'}</p>
              <div className="role__actions">
                <button
                  className="status__btn"
                  onClick={() => handleUpdateStatus(u._id, 'hired')}
                >
                  Mark as Hired
                </button>
                <button
                  className="status__btn"
                  onClick={() => handleUpdateStatus(u._id, 'denied')}
                >
                  Deny Request
                </button>
                <button
                  className="delete__btn"
                  onClick={() => handleDeleteUser(u._id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applications Section (if any) */}
      {/* You can leave this part as-is if it’s working */}
    </section>
  );
};

export default AdminDashboard;
