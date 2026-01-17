// Home.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import DeviceCard from '../Components/DeviceCard';
import { useAuth } from '../AuthProvider';
import './Home.css';
import '../Components/Spinner.css';
import { FaUserCircle, FaTools, FaCheckCircle, FaTrash, FaBoxOpen, FaClipboardList, FaChartLine } from 'react-icons/fa';
import AnalyticsDashboard from '../Components/AnalyticsDashboard';

function Home() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const [searchTerm, setSearchTerm] = useState('');

  // Local effect to ensure we display user data even if context is lagging
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      const fetchMe = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await api.get('/auth/me');
            setCurrentUser(response.data);
          } catch (e) {
            console.error("Failed to fetch user locally in Home", e);
          }
        }
      };
      fetchMe();
    }
  }, [user]);

  const [stats, setStats] = useState({
    all: 0,
    inRepair: 0,
    completed: 0,
    received: 0,
    trash: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // const handleSearch = (searchTerm) => {
  //   setSearchTerm(searchTerm);
  // };

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        // Parallel fetching for dashboard efficiency 
        const [allReq, repairReq, completedReq, receivedReq, trashReq] = await Promise.all([
          api.get('/devices'),
          api.get('/devices/In-repair'),
          api.get('/devices/Completed'),
          api.get('/devices/Received'),
          api.get('/devices/Trash')
        ]);

        setStats({
          all: allReq.data.length,
          inRepair: repairReq.data.length,
          completed: completedReq.data.length,
          received: receivedReq.data.length,
          trash: trashReq.data.length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="home-dashboard">
      <section className="welcome-banner">
        <div className="admin-profile-section">
          <div className="admin-avatar">
            <FaUserCircle />
          </div>
          <div className="admin-info">
            <h1 className="welcome-text">Welcome back, <span className="highlight">{currentUser?.username || 'Admin'}</span></h1>
            <p className="admin-email">{currentUser?.email || (user?.email) || 'admin@electrorenew.com'}</p>
            <span className="admin-role">Administrator</span>
          </div>
        </div>
      </section>

      {/* Modern Status Overview Table/Cards */}
      <section className="status-overview">
        <h3 className="section-title">Inventory Overview</h3>
        <div className="status-grid">

          <div className="status-card-premium all">
            <div className="icon-wrapper"><FaClipboardList /></div>
            <div className="status-details">
              <span className="status-label">Total Inventory</span>
              {loadingStats ? (
                <div className="mini-spinner"></div>
              ) : (
                <span className="status-count">{stats.all}</span>
              )}
            </div>
          </div>

          <div className="status-card-premium repair">
            <div className="icon-wrapper"><FaTools /></div>
            <div className="status-details">
              <span className="status-label">In Repair</span>
              {loadingStats ? (
                <div className="mini-spinner"></div>
              ) : (
                <span className="status-count">{stats.inRepair}</span>
              )}
            </div>
          </div>

          <div className="status-card-premium completed">
            <div className="icon-wrapper"><FaCheckCircle /></div>
            <div className="status-details">
              <span className="status-label">Completed</span>
              {loadingStats ? (
                <div className="mini-spinner"></div>
              ) : (
                <span className="status-count">{stats.completed}</span>
              )}
            </div>
          </div>

          <div className="status-card-premium received">
            <div className="icon-wrapper"><FaBoxOpen /></div>
            <div className="status-details">
              <span className="status-label">Received</span>
              {loadingStats ? (
                <div className="mini-spinner"></div>
              ) : (
                <span className="status-count">{stats.received}</span>
              )}
            </div>
          </div>

          <div className="status-card-premium trash">
            <div className="icon-wrapper"><FaTrash /></div>
            <div className="status-details">
              <span className="status-label">Trash</span>
              {loadingStats ? (
                <div className="mini-spinner"></div>
              ) : (
                <span className="status-count">{stats.trash}</span>
              )}
            </div>
          </div>

        </div>
      </section>

      <section className="analytics-section">
        <h3 className="section-title"><FaChartLine /> Performance Analytics</h3>
        <AnalyticsDashboard />
      </section>

      <section className="device-feed">
        <h3 className="section-title">Recent Activity Feed</h3>
        <DeviceCard searchTerm={searchTerm} limit={6} />
      </section>
    </div>
  );
}

export default Home;
