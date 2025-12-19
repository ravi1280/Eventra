import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../utils/mockData';
import 'leaflet/dist/leaflet.css';
import './EventMapPage.css';

// Fix for default marker icon in React Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const EventMapPage = () => {
    const events = getAllEvents().filter(event => event.type === 'venue' && event.latitude && event.longitude);

    // Center map on US (approximate center)
    const center = [39.8283, -98.5795];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="event-map-page">
            <div className="map-header">
                <div className="container">
                    <h1 className="map-title">Event Map</h1>
                    <p className="map-subtitle">
                        Explore events by location - Click on markers to see details
                    </p>
                    <div className="map-stats">
                        <span className="stat-badge">
                            📍 {events.length} Venue Events
                        </span>
                    </div>
                </div>
            </div>

            <div className="map-container-wrapper">
                <MapContainer
                    center={center}
                    zoom={4}
                    className="event-map"
                    scrollWheelZoom={true}
                    maxBounds={[[-85, -180], [85, 180]]}
                    minZoom={3}
                    maxBoundsViscosity={1.0}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        noWrap={true}
                    />

                    {events.map(event => (
                        <Marker
                            key={event.id}
                            position={[event.latitude, event.longitude]}
                        >
                            <Popup>
                                <div className="event-popup">
                                    <div
                                        className="popup-image"
                                        style={{ backgroundImage: `url(${event.image})` }}
                                    />
                                    <div className="popup-content">
                                        <h3 className="popup-title">{event.title}</h3>
                                        <div className="popup-meta">
                                            <div className="meta-row">
                                                <span className="meta-icon">📅</span>
                                                <span>{formatDate(event.date)}</span>
                                            </div>
                                            <div className="meta-row">
                                                <span className="meta-icon">🕐</span>
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="meta-row">
                                                <span className="meta-icon">📍</span>
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="meta-row">
                                                <span className="meta-icon">🏷️</span>
                                                <span className="category-badge">{event.category}</span>
                                            </div>
                                        </div>
                                        <div className="popup-capacity">
                                            <div className="capacity-bar">
                                                <div
                                                    className="capacity-fill"
                                                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                                />
                                            </div>
                                            <span className="capacity-text">
                                                {event.registered} / {event.capacity} registered
                                            </span>
                                        </div>
                                        <Link
                                            to={`/events/${event.id}`}
                                            className="btn btn-primary btn-sm popup-btn"
                                        >
                                            View Full Details
                                        </Link>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default EventMapPage;
