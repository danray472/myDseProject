import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaHome,
    FaTools,
    FaCheckCircle,
    FaBoxOpen,
    FaTrashAlt,
    FaPlus,
    FaList,
    FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../AuthProvider';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useAuth();

    // Using hardcoded logo path for now, ensure logo.png exists in public
    const logoSrc = "/logo.png";

    const navItems = [
        { to: '/Home', icon: <FaHome />, text: 'Dashboard' },
        { to: '/AllDevices', icon: <FaList />, text: 'All Devices' },
        { to: '/InRepair', icon: <FaTools />, text: 'In Repair' },
        { to: '/CompletedDevices', icon: <FaCheckCircle />, text: 'Completed' },
        { to: '/ReceivedDevices', icon: <FaBoxOpen />, text: 'Received' },
        { to: '/AddDevice', icon: <FaPlus />, text: 'Add Device' },
        { to: '/RemovedDevices', icon: <FaTrashAlt />, text: 'Trash Bin' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={logoSrc} alt="ElectroRenew" className="sidebar-logo" />
                <h1 className="sidebar-title">ElectroRenew</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                            >
                                <span className="sidebar-icon">{item.icon}</span>
                                <span className="sidebar-text">{item.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button onClick={logout} className="logout-button">
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
