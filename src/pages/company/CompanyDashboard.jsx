import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getEventsByCompany } from '../../utils/mockData';
import EventCard from '../../components/EventCard';

const CompanyDashboard = () => {
    const { currentUser } = useAuth();
    const companyEvents = getEventsByCompany(currentUser.id);

    const publishedEvents = companyEvents.filter(e => e.status === 'published').length;
    const pendingEvents = companyEvents.filter(e => e.status === 'pending').length;
    const totalRegistrations = companyEvents.reduce((sum, e) => sum + e.registered, 0);
    const draftEvents = companyEvents.filter(e => e.status === 'draft').length;

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Company Dashboard</h1>
                    <p className="dashboard-subtitle">Welcome back, {currentUser.companyName}!</p>
                </div>

                {/* Stats */}
                <div className="dashboard-grid">
                    <div className="stat-card" style={{ '--stat-gradient': 'var(--primary-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">📅</div>
                        </div>
                        <div className="stat-value">{publishedEvents}</div>
                        <div className="stat-label">Published Events</div>
                    </div>

                    <div className="stat-card" style={{ '--stat-gradient': 'var(--warning-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">⏳</div>
                        </div>
                        <div className="stat-value">{pendingEvents}</div>
                        <div className="stat-label">Pending Approval</div>
                    </div>

                    <div className="stat-card" style={{ '--stat-gradient': 'var(--success-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">👥</div>
                        </div>
                        <div className="stat-value">{totalRegistrations}</div>
                        <div className="stat-label">Total Registrations</div>
                    </div>

                    <div className="stat-card" style={{ '--stat-gradient': 'var(--secondary-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">📝</div>
                        </div>
                        <div className="stat-value">{draftEvents}</div>
                        <div className="stat-label">Draft Events</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="page-header">
                    <h2>Quick Actions</h2>
                    <Link to="/company/create-event" className="btn btn-primary">
                        ➕ Create New Event
                    </Link>
                </div>

                {/* Recent Events */}
                <div>
                    <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Your Recent Events</h2>
                    {companyEvents.length > 0 ? (
                        <div className="events-grid">
                            {companyEvents.slice(0, 6).map(event => (
                                <EventCard key={event.id} event={event} showActions={true} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">📅</div>
                            <h3>No events yet</h3>
                            <p>Create your first event to get started</p>
                            <Link to="/company/create-event" className="btn btn-primary">
                                Create Event
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;
