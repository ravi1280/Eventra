import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatDate, calculateProgress } from '../utils/mockData';
import './EventCard.css';

const EventCard = ({ event, onEdit, onDelete, onApprove, onReject, showActions = false }) => {
    const { currentUser, isPublic } = useAuth();
    const progress = calculateProgress(event.registered, event.capacity);
    const isFull = event.registered >= event.capacity;

    const getStatusBadge = () => {
        switch (event.status) {
            case 'published':
                return <span className="badge badge-success">Published</span>;
            case 'pending':
                return <span className="badge badge-warning">Pending</span>;
            case 'draft':
                return <span className="badge badge-muted">Draft</span>;
            default:
                return null;
        }
    };

    return (
        <div className="event-card glass-card">
            <div className="event-image-wrapper">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-overlay">
                    {event.featured && <span className="featured-badge">⭐ Featured</span>}
                    {getStatusBadge()}
                </div>
                <div className="event-category">{event.category}</div>
            </div>

            <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-meta">
                    <div className="meta-item">
                        <span className="meta-icon">📅</span>
                        <span>{formatDate(event.date)} at {event.time}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-icon">{event.type === 'online' ? '💻' : '📍'}</span>
                        <span>{event.location}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-icon">🏢</span>
                        <span>{event.companyName}</span>
                    </div>
                </div>

                {/* Registration Progress */}
                <div className="event-progress">
                    <div className="progress-header">
                        <span className="progress-text">
                            {event.registered} / {event.capacity} registered
                        </span>
                        <span className="progress-percent">{progress}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Actions */}
                <div className="event-actions">
                    <Link to={`/events/${event.id}`} className="btn btn-outline btn-sm">
                        View Details
                    </Link>

                    {isFull && event.status === 'published' && (
                        <span className="badge badge-danger">Fully Booked</span>
                    )}

                    {showActions && onEdit && (
                        <button onClick={() => onEdit(event)} className="btn btn-ghost btn-sm">
                            ✏️ Edit
                        </button>
                    )}

                    {showActions && onDelete && (
                        <button onClick={() => onDelete(event)} className="btn btn-ghost btn-sm">
                            🗑️ Delete
                        </button>
                    )}

                    {showActions && onApprove && event.status === 'pending' && (
                        <>
                            <button onClick={() => onApprove(event)} className="btn btn-primary btn-sm">
                                ✅ Approve
                            </button>
                            <button onClick={() => onReject(event)} className="btn btn-secondary btn-sm">
                                ❌ Reject
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
