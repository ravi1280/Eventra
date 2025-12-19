import { mockUsers } from '../../utils/mockData';

const ManageUsers = () => {
    const publicUsers = mockUsers.filter(u => u.role === 'public');
    const allUsers = mockUsers;

    return (
        <div className="dashboard">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Manage Users</h1>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Registered Events</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin' && <span className="badge badge-primary">Admin</span>}
                                        {user.role === 'company' && <span className="badge badge-secondary">Company</span>}
                                        {user.role === 'public' && <span className="badge badge-success">Public</span>}
                                    </td>
                                    <td>{user.registeredEvents?.length || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
