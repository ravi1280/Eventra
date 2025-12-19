import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getAllEvents } from '../utils/mockData';
import './MyEventsPage.css';

const MyEventsPage = () => {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [selectedQR, setSelectedQR] = useState(null);

    useEffect(() => {
        // Get registered events with full registration data
        const storedRegistrations = localStorage.getItem('eventRegistrations');
        if (storedRegistrations) {
            const registrations = JSON.parse(storedRegistrations);
            const allEvents = getAllEvents();

            // Map registrations to events with registration details
            const userEvents = registrations.map(reg => {
                const event = allEvents.find(e => e.id === reg.eventId);
                return {
                    ...event,
                    registrationData: reg
                };
            }).filter(e => e.id); // Filter out any null events

            setRegisteredEvents(userEvents);
        }
    }, []);

    const handleCancelRegistration = (eventId) => {
        // Remove from registrations
        const storedRegistrations = localStorage.getItem('eventRegistrations');
        if (storedRegistrations) {
            const registrations = JSON.parse(storedRegistrations);
            const updatedRegistrations = registrations.filter(reg => reg.eventId !== eventId);
            localStorage.setItem('eventRegistrations', JSON.stringify(updatedRegistrations));
        }

        // Remove from event IDs
        const storedEvents = localStorage.getItem('registeredEvents');
        if (storedEvents) {
            const eventIds = JSON.parse(storedEvents);
            const updatedIds = eventIds.filter(id => id !== eventId);
            localStorage.setItem('registeredEvents', JSON.stringify(updatedIds));
        }

        // Update state
        setRegisteredEvents(prev => prev.filter(event => event.id !== eventId));
    };

    const getEventStatus = (event) => {
        const eventDate = new Date(`${event.date} ${event.time}`);
        const now = new Date();

        if (eventDate < now) {
            return { label: 'COMPLETED', className: 'status-completed' };
        } else if (eventDate - now < 24 * 60 * 60 * 1000) {
            return { label: 'UPCOMING SOON', className: 'status-upcoming-soon' };
        } else {
            return { label: 'UPCOMING', className: 'status-upcoming' };
        }
    };

    const generateQRData = (registration) => {
        // Create URL with registration data as query parameter
        const baseUrl = window.location.origin;
        const data = encodeURIComponent(JSON.stringify({
            registrationId: registration.registrationId,
            eventId: registration.eventId,
            eventTitle: registration.eventTitle,
            eventDate: registration.eventDate,
            eventTime: registration.eventTime,
            eventLocation: registration.eventLocation,
            userName: registration.userName,
            userEmail: registration.userEmail,
            userId: registration.userId,
            registeredAt: registration.registrationDate
        }));
        return `${baseUrl}/qr-scan?data=${data}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };

    return (
        <div className="my-events-page">
            <div className="my-events-hero">
                <div className="container">
                    <h1 className="my-events-title">My Event Tickets</h1>
                    <p className="my-events-subtitle">
                        Your registered events - Show QR code at venue for entry
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="my-events-content">
                    {registeredEvents.length === 0 ? (
                        <div className="no-events">
                            <div className="no-events-icon">🎫</div>
                            <h2>No Event Tickets</h2>
                            <p>You haven't registered for any events yet.</p>
                            <Link to="/events" className="btn btn-primary">
                                Browse Events
                            </Link>
                        </div>
                    ) : (
                        <div className="tickets-grid">
                            {registeredEvents.map((event, index) => {
                                const status = getEventStatus(event);
                                const colors = ['purple', 'green', 'blue', 'pink', 'yellow'];
                                const ticketColor = colors[index % colors.length];
                                return (
                                    <div key={event.id} className="event-ticket" data-color={ticketColor}>
                                        {/* Ticket Stub (Left Side) */}
                                        <div className="ticket-stub">
                                            <div className="stub-content">
                                                <div className="stub-location">{event.location}</div>
                                                <div className="stub-id">#{event.registrationData?.registrationId || `REG${event.id}`}</div>
                                            </div>
                                        </div>

                                        {/* Ticket Main (Right Side) */}
                                        <div className="ticket-main">

                                            <div className="ticket-body">
                                                <div className="ticket-left">
                                                    <div className="ticket-id">#{event.registrationData?.registrationId || `REG${event.id}`}</div>
                                                    <h3 className="ticket-title">{event.title}</h3>
                                                    <div className="ticket-date-info">
                                                        {formatDate(event.date)} - {event.time}
                                                    </div>
                                                    <div className="ticket-description">
                                                        {event.location}
                                                    </div>
                                                    <div className="ticket-capacity-section">
                                                        <div className="capacity-label">CAPACITY</div>
                                                        <div className="capacity-value">{event.capacity}</div>
                                                    </div>
                                                </div>

                                                <div className="ticket-right">
                                                    <div className="ticket-qr" onClick={() => setSelectedQR(event.registrationData)}>
                                                        <QRCodeSVG
                                                            value={generateQRData(event.registrationData)}
                                                            size={100}
                                                            level="H"
                                                            includeMargin={false}
                                                        />
                                                        <div className="qr-label">SCAN TO VERIFY</div>
                                                    </div>

                                                    <Link to={`/events/${event.id}`} className="ticket-go-btn">
                                                        GO
                                                    </Link>
                                                    <button
                                                        className="ticket-cancel-btn"
                                                        onClick={() => handleCancelRegistration(event.id)}
                                                    >
                                                        CANCEL
                                                    </button>
                                                </div>
                                            </div>


                                        </div>


                                        {/* Perforation Effect */}
                                        <div className="ticket-perforation"></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* QR Code Modal */}
            {selectedQR && (
                <div className="qr-modal-overlay" onClick={() => setSelectedQR(null)}>
                    <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="qr-modal-close" onClick={() => setSelectedQR(null)}>✕</button>
                        <h2>Event Registration QR Code</h2>
                        <div className="qr-modal-content">
                            <div className="qr-code-large">
                                <QRCodeSVG
                                    value={generateQRData(selectedQR)}
                                    size={300}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <div className="qr-details">
                                <h3>Registration Details</h3>
                                <div className="detail-row">
                                    <strong>Registration ID:</strong>
                                    <span>{selectedQR.registrationId}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Event:</strong>
                                    <span>{selectedQR.eventTitle}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Date:</strong>
                                    <span>{selectedQR.eventDate}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Time:</strong>
                                    <span>{selectedQR.eventTime}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Location:</strong>
                                    <span>{selectedQR.eventLocation}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Name:</strong>
                                    <span>{selectedQR.userName}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Email:</strong>
                                    <span>{selectedQR.userEmail}</span>
                                </div>
                            </div>
                            <p className="qr-instruction">
                                📱 Show this QR code at the event venue for check-in
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyEventsPage;
