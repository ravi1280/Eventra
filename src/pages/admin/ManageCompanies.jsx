import { useState } from 'react';
import { mockUsers } from '../../utils/mockData';

const ManageCompanies = () => {
    const [users, setUsers] = useState(mockUsers);
    const companies = users.filter(u => u.role === 'company');

    const handleApprove = (company) => {
        const userIndex = users.findIndex(u => u.id === company.id);
        if (userIndex !== -1) {
            const updatedUsers = [...users];
            updatedUsers[userIndex].status = 'approved';
            setUsers(updatedUsers);
            alert(`${company.companyName} has been approved!`);
        }
    };

    const handleSuspend = (company) => {
        if (confirm(`Are you sure you want to suspend ${company.companyName}?`)) {
            const userIndex = users.findIndex(u => u.id === company.id);
            if (userIndex !== -1) {
                const updatedUsers = [...users];
                updatedUsers[userIndex].status = 'suspended';
                setUsers(updatedUsers);
                alert(`${company.companyName} has been suspended.`);
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Manage Companies</h1>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img src={company.avatar} alt={company.companyName} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{company.companyName}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{company.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{company.name}</td>
                                    <td>{company.email}</td>
                                    <td>
                                        {company.status === 'approved' && <span className="badge badge-success">Approved</span>}
                                        {company.status === 'pending' && <span className="badge badge-warning">Pending</span>}
                                        {company.status === 'suspended' && <span className="badge badge-danger">Suspended</span>}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {company.status === 'pending' && (
                                                <button onClick={() => handleApprove(company)} className="btn btn-primary btn-sm">
                                                    Approve
                                                </button>
                                            )}
                                            {company.status === 'approved' && (
                                                <button onClick={() => handleSuspend(company)} className="btn btn-secondary btn-sm">
                                                    Suspend
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCompanies;
