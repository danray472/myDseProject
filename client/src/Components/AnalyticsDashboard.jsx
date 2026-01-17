import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import api from '../api';
import './AnalyticsDashboard.css';
import { FaChartLine, FaHourglassHalf, FaTrophy } from 'react-icons/fa';

const COLORS = ['#1b4332', '#2d6a4f', '#409167', '#52b788', '#74c69d', '#95d5b2'];

const AnalyticsDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                console.log('Frontend: Calling /devices/analytics...');
                const response = await api.get('/devices/analytics');
                console.log('Frontend: Analytics Data Received:', response.data);
                setData(response.data);
                setError(false);
            } catch (err) {
                console.error('Frontend: Analytics Fetch Failed:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="analytics-loading">Gathering business insights...</div>;
    if (error) return <div className="analytics-error">Could not load analytics data. Checking server connection...</div>;
    if (!data) return null;

    return (
        <div className="analytics-grid">
            <div className="analytics-summary">
                <div className="summary-stat-card">
                    <div className="stat-icon"><FaHourglassHalf /></div>
                    <div className="stat-info">
                        <span className="stat-label">Avg. Turnaround</span>
                        <span className="stat-value">{data.avgTurnaround} Days</span>
                    </div>
                </div>
                <div className="summary-stat-card">
                    <div className="stat-icon"><FaChartLine /></div>
                    <div className="stat-info">
                        <span className="stat-label">30d Volume</span>
                        <span className="stat-value">{data.volume.reduce((acc, c) => acc + c.count, 0)} Units</span>
                    </div>
                </div>
                <div className="summary-stat-card">
                    <div className="stat-icon"><FaTrophy /></div>
                    <div className="stat-info">
                        <span className="stat-label">Main Device Type</span>
                        <span className="stat-value">{data.deviceTypes[0]?.name || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-card">
                    <h3>Repair Activity Trend</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.volume}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tickFormatter={(t) => t.split('-').slice(1).join('/')} />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#2d6a4f" strokeWidth={3} dot={{ fill: '#2d6a4f' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="chart-card">
                    <h3>Device Mix</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data.deviceTypes} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80}>
                                    {data.deviceTypes.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
