import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaUserClock, FaUsers, FaTags, FaChartBar, FaFileInvoice, FaRupeeSign, FaClipboardList, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../App.css';
import logo from '../Components/logo (2).png'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <img src={logo} height={"40px"} width={"60px"} alt="logo" />
        {!collapsed && <span>Water Dispension</span>}
      </div>

      <ul className="menu">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome /> {!collapsed && <span>Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/stations" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaMapMarkerAlt /> {!collapsed && <span>Stations</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaChartBar /> {!collapsed && <span>Analytics</span>}
          </NavLink>
        </li>
         <li>
          <NavLink to="/session" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUserClock /> {!collapsed && <span>Session</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUsers /> {!collapsed && <span>Customers</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoices" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaFileInvoice /> {!collapsed && <span>Invoices</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/logs" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaClipboardList /> {!collapsed && <span>Logs</span>}
          </NavLink>
        </li>
      </ul>

      <div className="bottom-section">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
