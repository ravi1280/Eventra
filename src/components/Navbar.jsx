import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { currentUser, logout, isAdmin, isCompany, isPublic } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowDropdown(false);
    };

    const getDashboardLink = () => {
        if (isAdmin()) return '/admin/dashboard';
        if (isCompany()) return '/company/dashboard';
        return '/my-events';
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <span className="logo-text">Eventra</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/events" className="nav-link">Events</Link>
                        <Link to="/events/map" className="nav-link"> Map View</Link>
                        {currentUser && isPublic() && (
                            <Link to="/my-events" className="nav-link">My Events</Link>
                        )}
                        {!currentUser && (
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                            </>
                        )}
                        {currentUser && (
                            <div className="user-menu">
                                <button
                                    className="user-button"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
                                    <span className="user-name">{currentUser.name}</span>
                                    <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                        <path d="M6 9L1 4h10z" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-header">
                                            <p className="dropdown-name">{currentUser.name}</p>
                                            <p className="dropdown-role">{currentUser.role}</p>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link to={getDashboardLink()} className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                            <span>📊</span> Dashboard
                                        </Link>
                                        {isCompany() && (
                                            <>
                                                <Link to="/company/create-event" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                                    <span>➕</span> Create Event
                                                </Link>
                                                <Link to="/company/manage-events" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                                    <span>📅</span> Manage Events
                                                </Link>
                                            </>
                                        )}
                                        {isAdmin() && (
                                            <>
                                                <Link to="/admin/companies" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                                    <span>🏢</span> Manage Companies
                                                </Link>
                                                <Link to="/admin/moderate" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                                    <span>✅</span> Moderate Events
                                                </Link>
                                                <Link to="/admin/users" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                                    <span>👥</span> Manage Users
                                                </Link>
                                            </>
                                        )}
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            <span>🚪</span> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="mobile-menu">
                        <Link to="/" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Home</Link>
                        <Link to="/events" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Events</Link>
                        <Link to="/events/map" className="mobile-link" onClick={() => setShowMobileMenu(false)}> Map View</Link>
                        {currentUser && isPublic() && (
                            <Link to="/my-events" className="mobile-link" onClick={() => setShowMobileMenu(false)}>My Events</Link>
                        )}
                        {!currentUser ? (
                            <>
                                <Link to="/login" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Login</Link>
                                <Link to="/register" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to={getDashboardLink()} className="mobile-link" onClick={() => setShowMobileMenu(false)}>Dashboard</Link>
                                {isCompany() && (
                                    <>
                                        <Link to="/company/create-event" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Create Event</Link>
                                        <Link to="/company/manage-events" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Manage Events</Link>
                                    </>
                                )}
                                {isAdmin() && (
                                    <>
                                        <Link to="/admin/companies" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Manage Companies</Link>
                                        <Link to="/admin/moderate" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Moderate Events</Link>
                                        <Link to="/admin/users" className="mobile-link" onClick={() => setShowMobileMenu(false)}>Manage Users</Link>
                                    </>
                                )}
                                <button className="mobile-link" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
