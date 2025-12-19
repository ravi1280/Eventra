import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './QRScanPage.css';

const QRScanPage = () => {
    const [searchParams] = useSearchParams();
    const [registrationData, setRegistrationData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get registration data from URL parameter
        const data = searchParams.get('data');

        if (data) {
            try {
                const parsed = JSON.parse(decodeURIComponent(data));
                setRegistrationData(parsed);
            } catch (err) {
                setError('Invalid QR code data');
            }
        } else {
            setError('No registration data found');
        }
    }, [searchParams]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return timeString;
    };

    const formatRegistrationDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (error) {
        return (
            <div className="qr-scan-page">
                <div className="scan-error">
                    <div className="error-icon">❌</div>
                    <h1>Invalid QR Code</h1>
                    <p>{error}</p>
                    <Link to="/" className="btn btn-primary">Go to Home</Link>
                </div>
            </div>
        );
    }

    if (!registrationData) {
        return (
            <div className="qr-scan-page">
                <div className="scan-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading registration details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="qr-scan-page">
            <div className="scan-container">
                {/* Success Header */}
                <div className="scan-header">
                    <div className="success-icon">✓</div>
                    <h1>Valid Registration</h1>
                    <p className="scan-subtitle">Event registration confirmed</p>
                </div>

                {/* Event Information */}
                <div className="scan-section">
                    <h2 className="section-title">Event Details</h2>
                    <div className="event-info-card">
                        <h3 className="event-title">{registrationData.eventTitle}</h3>

                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-icon">📅</div>
                                <div className="info-content">
                                    <div className="info-label">Date</div>
                                    <div className="info-value">{formatDate(registrationData.eventDate)}</div>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">🕐</div>
                                <div className="info-content">
                                    <div className="info-label">Time</div>
                                    <div className="info-value">{formatTime(registrationData.eventTime)}</div>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">📍</div>
                                <div className="info-content">
                                    <div className="info-label">Location</div>
                                    <div className="info-value">{registrationData.eventLocation}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendee Information */}
                <div className="scan-section">
                    <h2 className="section-title">Attendee Information</h2>
                    <div className="attendee-card">
                        <div className="attendee-avatar">
                            {registrationData.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="attendee-details">
                            <h3 className="attendee-name">{registrationData.userName}</h3>
                            <p className="attendee-email">{registrationData.userEmail}</p>
                            <p className="attendee-id">ID: {registrationData.userId}</p>
                        </div>
                    </div>
                </div>

                {/* Registration Information */}
                <div className="scan-section">
                    <h2 className="section-title">Registration Details</h2>
                    <div className="registration-card">
                        <div className="reg-item">
                            <span className="reg-label">Registration ID</span>
                            <span className="reg-value">{registrationData.registrationId}</span>
                        </div>
                        <div className="reg-item">
                            <span className="reg-label">Registered On</span>
                            <span className="reg-value">{formatRegistrationDate(registrationData.registeredAt)}</span>
                        </div>
                        <div className="reg-item">
                            <span className="reg-label">Status</span>
                            <span className="reg-status confirmed">Confirmed</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="scan-actions">
                    <button className="btn btn-success btn-lg">
                        ✓ Check In Attendee
                    </button>
                    <Link to="/" className="btn btn-ghost">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QRScanPage;
