import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaCog, FaAngleLeft, FaAngleRight, FaClipboardList } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <FaAngleLeft/> : <FaAngleRight/>}
      </div>

      <div className="sidebar-header">
        <FaClipboardList className="logo-icon"/>
        <span className="app-title">BinusFlow</span>
      </div>

      <div className={`menu-item ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
        <FaHome size={24} style={{minWidth: '40px'}}/>
        <span className="menu-text">Dashboard</span>
      </div>

      <div className={`menu-item ${isActive('/config') ? 'active' : ''}`} onClick={() => navigate('/config')}>
        <FaCog size={24} style={{minWidth: '40px'}}/>
        <span className="menu-text">Configuration</span>
      </div>
    </div>
  );
};

export default Sidebar;