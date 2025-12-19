import { useAuth } from '../../context/AuthContext';
import { getEventsByCompany } from '../../utils/mockData';
import EventCard from '../../components/EventCard';

const ManageEvents = () => {
    const { currentUser } = useAuth();
    const companyEvents = getEventsByCompany(currentUser.id);

    const handleEdit = (event) => {
        alert(`Edit functionality for "${event.title}" would be implemented here`);
    };

    const handleDelete = (event) => {
        if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
            alert('Event deleted successfully!');
        }
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Manage Events</h1>
                </div>

                {companyEvents.length > 0 ? (
                    <div className="events-grid">
                        {companyEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                showActions={true}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📅</div>
                        <h3>No events yet</h3>
                        <p>Create your first event to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageEvents;
