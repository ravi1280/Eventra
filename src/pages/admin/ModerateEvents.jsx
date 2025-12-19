import { useState } from 'react';
import { getEventsByStatus, mockEvents } from '../../utils/mockData';
import EventCard from '../../components/EventCard';

const ModerateEvents = () => {
    const [events, setEvents] = useState(mockEvents);
    const pendingEvents = events.filter(e => e.status === 'pending');

    const handleApprove = (event) => {
        const eventIndex = events.findIndex(e => e.id === event.id);
        if (eventIndex !== -1) {
            const updatedEvents = [...events];
            updatedEvents[eventIndex].status = 'published';
            setEvents(updatedEvents);
            alert(`Event "${event.title}" has been approved and published!`);
        }
    };

    const handleReject = (event) => {
        if (confirm(`Are you sure you want to reject "${event.title}"?`)) {
            const eventIndex = events.findIndex(e => e.id === event.id);
            if (eventIndex !== -1) {
                const updatedEvents = [...events];
                updatedEvents[eventIndex].status = 'draft';
                setEvents(updatedEvents);
                alert(`Event "${event.title}" has been rejected.`);
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Moderate Events</h1>
                    <span className="badge badge-warning">{pendingEvents.length} Pending</span>
                </div>

                {pendingEvents.length > 0 ? (
                    <div className="events-grid">
                        {pendingEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                showActions={true}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">✅</div>
                        <h3>All caught up!</h3>
                        <p>No events pending approval</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModerateEvents;
