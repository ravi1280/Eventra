import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getEventById, formatDate, calculateProgress } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import CountdownTimer from '../components/CountdownTimer';
import './EventDetailPage.css';

const EventDetailPage = () => {
    const { id } = useParams();
    const event = getEventById(id);
    const { isPublic } = useAuth();
    const progress = event ? calculateProgress(event.registered, event.capacity) : 0;

    // Registration state
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState('');

    if (!event) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Event not found</h2>
                <Link to="/events" className="btn btn-primary">Back to Events</Link>
            </div>
        );
    }

    const isFull = event.registered >= event.capacity;

    // Handle registration
    const handleRegister = async () => {
        // Reset states
        setRegistrationError('');
        setIsRegistering(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check if event is full
            if (isFull) {
                throw new Error('This event is fully booked');
            }

            // Get current user info (in real app, this would come from auth context)
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "Guest User", "email": "guest@example.com", "id": "guest-001"}');

            // Create registration data with user and event details
            const registrationData = {
                eventId: event.id,
                eventTitle: event.title,
                eventDate: event.date,
                eventTime: event.time,
                eventLocation: event.location,
                eventCategory: event.category,
                userName: currentUser.name,
                userEmail: currentUser.email,
                userId: currentUser.id,
                registrationDate: new Date().toISOString(),
                registrationId: `REG-${event.id}-${Date.now()}`
            };

            // Save to localStorage
            const storedRegistrations = localStorage.getItem('eventRegistrations');
            const registrations = storedRegistrations ? JSON.parse(storedRegistrations) : [];
            registrations.push(registrationData);
            localStorage.setItem('eventRegistrations', JSON.stringify(registrations));

            // Also save event IDs for backward compatibility
            const storedEvents = localStorage.getItem('registeredEvents');
            const eventIds = storedEvents ? JSON.parse(storedEvents) : [];

            if (!eventIds.includes(event.id)) {
                eventIds.push(event.id);
                localStorage.setItem('registeredEvents', JSON.stringify(eventIds));
            }

            console.log('Registration successful:', registrationData);

            setRegistrationSuccess(true);

            // Reset success message after 5 seconds
            setTimeout(() => {
                setRegistrationSuccess(false);
            }, 5000);

        } catch (error) {
            setRegistrationError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="event-detail-page">
            <div className="event-hero" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="event-hero-overlay">
                    <div className="container">
                        <div className="breadcrumb">
                            <Link to="/">Home</Link> / <Link to="/events">Events</Link> / {event.title}
                        </div>
                        <h1 className="event-detail-title">{event.title}</h1>
                        <div className="event-meta-badges">
                            <span className="badge badge-primary">{event.category}</span>
                            {event.featured && <span className="badge badge-warning">⭐ Featured</span>}
                            <span className="badge badge-ghost">{event.type === 'online' ? '💻 Online' : '📍 Venue'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="event-detail-content-full">
                    {/* About This Event */}
                    <div className="event-about-section">
                        <h2>About This Event</h2>
                        <p className="event-detail-description">{event.description}</p>

                        <div className="event-info-grid">
                            <div className="info-item">
                                <span className="info-icon">📅</span>
                                <div>
                                    <div className="info-label">Date</div>
                                    <div className="info-value">{formatDate(event.date)}</div>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🕐</span>
                                <div>
                                    <div className="info-label">Time</div>
                                    <div className="info-value">{event.time}</div>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📍</span>
                                <div>
                                    <div className="info-label">Location</div>
                                    <div className="info-value">{event.location}</div>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🏢</span>
                                <div>
                                    <div className="info-label">Organizer</div>
                                    <div className="info-value">{event.companyName}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event Starts In - Countdown Timer */}
                    <div className="event-about-section">
                        <CountdownTimer eventDate={event.date} eventTime={event.time} />
                    </div>

                    {/* Registration and Share Event Row */}
                    <div className="registration-share-row">
                        {/* Registration Card */}
                        <div className="event-about-section">
                            <h3>Registration</h3>
                            <div className="registration-progress">
                                <div className="progress-header">
                                    <span>{event.registered} registered</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="progress-note">{event.capacity - event.registered} spots remaining</p>
                            </div>

                            {isPublic() && !isFull && !registrationSuccess && (
                                <button
                                    className="btn btn-primary btn-full"
                                    onClick={handleRegister}
                                    disabled={isRegistering}
                                >
                                    {isRegistering ? 'Registering...' : 'Register for Event'}
                                </button>
                            )}

                            {registrationSuccess && (
                                <div className="alert alert-success">
                                    <div>✅ Successfully registered for {event.title}!</div>
                                    <Link to="/my-events" className="btn btn-ghost btn-sm" style={{ marginTop: 'var(--spacing-sm)' }}>
                                        View My Events
                                    </Link>
                                </div>
                            )}

                            {registrationError && (
                                <div className="alert alert-error">
                                    ❌ {registrationError}
                                </div>
                            )}

                            {isFull && (
                                <div className="alert alert-error">
                                    This event is fully booked
                                </div>
                            )}

                            {!isPublic() && (
                                <Link to="/login" className="btn btn-primary btn-full">
                                    Login to Register
                                </Link>
                            )}
                        </div>

                        {/* Share Event Card */}
                        <div className="event-about-section">
                            <h3>Share Event</h3>
                            <div className="share-buttons">
                                <button className="btn btn-ghost btn-sm">📱 Share</button>
                                <button className="btn btn-ghost btn-sm">🔗 Copy Link</button>
                            </div>
                        </div>
                    </div>

                    {/* YouTube Live Stream - Only for Online Events */}
                    {event.type === 'online' && event.youtubeStreamId && (
                        <div className="glass-card live-stream-section">
                            <h2>🔴 Live Stream</h2>
                            <div className="youtube-embed">
                                <iframe
                                    width="100%"
                                    height="450"
                                    src={`https://www.youtube.com/embed/${event.youtubeStreamId}`}
                                    title="YouTube Live Stream"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <p className="stream-note">
                                💡 The live stream will be available at the scheduled event time
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
