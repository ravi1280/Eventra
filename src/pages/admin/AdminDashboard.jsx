import { mockEvents, mockUsers, getEventsByStatus } from '../../utils/mockData';

const AdminDashboard = () => {
    const totalEvents = mockEvents.length;
    const publishedEvents = getEventsByStatus('published').length;
    const pendingEvents = getEventsByStatus('pending').length;
    const totalCompanies = mockUsers.filter(u => u.role === 'company').length;
    const totalUsers = mockUsers.filter(u => u.role === 'public').length;
    const totalRegistrations = mockEvents.reduce((sum, e) => sum + e.registered, 0);

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Admin Dashboard</h1>
                    <p className="dashboard-subtitle">System Overview</p>
                </div>

                {/* Stats */}
                <div className="dashboard-grid">
                    <div className="stat-card" style={{ '--stat-gradient': 'var(--primary-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">📅</div>
                        </div>
                        <div className="stat-value">{totalEvents}</div>
                        <div className="stat-label">Total Events</div>
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
                            <div className="stat-icon">🏢</div>
                        </div>
                        <div className="stat-value">{totalCompanies}</div>
                        <div className="stat-label">Companies</div>
                    </div>

                    <div className="stat-card" style={{ '--stat-gradient': 'var(--accent-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">👥</div>
                        </div>
                        <div className="stat-value">{totalUsers}</div>
                        <div className="stat-label">Public Users</div>
                    </div>

                    <div className="stat-card" style={{ '--stat-gradient': 'var(--secondary-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">✅</div>
                        </div>
                        <div className="stat-value">{publishedEvents}</div>
                        <div className="stat-label">Published Events</div>
                    </div>

                    <div className="stat-card" style={{ '--stat-gradient': 'var(--primary-gradient)' }}>
                        <div className="stat-card-header">
                            <div className="stat-icon">🎟️</div>
                        </div>
                        <div className="stat-value">{totalRegistrations}</div>
                        <div className="stat-label">Total Registrations</div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Activity</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Registered</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockEvents.slice(0, 10).map(event => (
                                    <tr key={event.id}>
                                        <td>{event.title}</td>
                                        <td>{event.companyName}</td>
                                        <td>
                                            {event.status === 'published' && <span className="badge badge-success">Published</span>}
                                            {event.status === 'pending' && <span className="badge badge-warning">Pending</span>}
                                            {event.status === 'draft' && <span className="badge badge-muted">Draft</span>}
                                        </td>
                                        <td>{event.registered} / {event.capacity}</td>
                                        <td>{event.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
