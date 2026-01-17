import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { FaBars } from 'react-icons/fa';
import './Layout.css';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Mobile specific title based on route
    // const getPageTitle = () => {
    //     const path = location.pathname;
    //     if (path === '/Home' || path === '/') return 'Dashboard';
    //     return path.replace('/', '').replace(/([A-Z])/g, ' $1').trim();
    // };

    const navLinks = [
        { to: '/Home', text: 'Dashboard' },
        { to: '/AllDevices', text: 'All Devices' },
        { to: '/InRepair', text: 'In Repair' },
        { to: '/CompletedDevices', text: 'Completed' },
        { to: '/ReceivedDevices', text: 'Received' },
        { to: '/AddDevice', text: 'Add Device' },
        { to: '/RemovedDevices', text: 'Trash Bin' },
    ];

    return (
        <div className="layout">
            <Sidebar />

            <div className="main-content-wrapper">
                <header className="mobile-header">
                    <button className="menu-toggle" onClick={toggleMobileMenu}>
                        <FaBars />
                    </button>
                    <div className="mobile-branding">
                        <img src="/logo.png" alt="Logo" className="mobile-logo-img" />
                        <h2 className="mobile-title">ElectroRenew</h2>
                    </div>
                    <div className="placeholder"></div>
                </header>

                <main className="main-content">
                    {children}
                    <div className="scroll-spacer"></div>
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <MobileMenu
                    links={navLinks}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
