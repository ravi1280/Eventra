import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockEvents, categories } from '../../utils/mockData';

const CreateEvent = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Technology',
        date: '',
        time: '',
        location: '',
        type: 'venue',
        capacity: '',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
        youtubeStreamId: '',
        latitude: '',
        longitude: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            id: mockEvents.length + 1,
            ...formData,
            capacity: parseInt(formData.capacity),
            registered: 0,
            companyId: currentUser.id,
            companyName: currentUser.companyName,
            status: 'pending',
            featured: false,
            createdAt: new Date().toISOString().split('T')[0],
            // Only include youtubeStreamId if event is online and ID is provided
            ...(formData.type === 'online' && formData.youtubeStreamId && {
                youtubeStreamId: formData.youtubeStreamId
            }),
            // Include latitude and longitude for venue events
            ...(formData.type === 'venue' && formData.latitude && formData.longitude && {
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude)
            })
        };

        mockEvents.push(newEvent);
        alert('Event created successfully! It will be published after admin approval.');
        navigate('/company/dashboard');
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Create New Event</h1>
                </div>

                <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label htmlFor="title" className="input-label">Event Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="input"
                                placeholder="Amazing Tech Conference 2025"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="description" className="input-label">Description *</label>
                            <textarea
                                id="description"
                                name="description"
                                className="input"
                                placeholder="Tell attendees what makes this event special..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="category" className="input-label">Category *</label>
                            <select
                                id="category"
                                name="category"
                                className="input"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div className="input-group">
                                <label htmlFor="date" className="input-label">Date *</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="input"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="time" className="input-label">Time *</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    className="input"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="type" className="input-label">Event Type *</label>
                            <select
                                id="type"
                                name="type"
                                className="input"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="venue">In-Person (Venue)</option>
                                <option value="online">Online</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="location" className="input-label">Location *</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="input"
                                placeholder={formData.type === 'online' ? 'Online Platform' : 'Venue Address'}
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* YouTube Stream ID - Only for Online Events */}
                        {formData.type === 'online' && (
                            <div className="input-group">
                                <label htmlFor="youtubeStreamId" className="input-label">
                                    YouTube Stream ID (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="youtubeStreamId"
                                    name="youtubeStreamId"
                                    className="input"
                                    placeholder="e.g., jfKfPfyJRdk (from youtube.com/watch?v=jfKfPfyJRdk)"
                                    value={formData.youtubeStreamId}
                                    onChange={handleChange}
                                />
                                <small style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                                    💡 Enter the YouTube video ID for live streaming. Find it in the URL after "v="
                                </small>
                            </div>
                        )}

                        {/* Latitude & Longitude - Only for Venue Events */}
                        {formData.type === 'venue' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div className="input-group">
                                    <label htmlFor="latitude" className="input-label">
                                        Latitude (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        id="latitude"
                                        name="latitude"
                                        className="input"
                                        placeholder="e.g., 6.9271"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        step="any"
                                        min="-90"
                                        max="90"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="longitude" className="input-label">
                                        Longitude (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        id="longitude"
                                        name="longitude"
                                        className="input"
                                        placeholder="e.g., 79.8612"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        step="any"
                                        min="-180"
                                        max="180"
                                    />
                                </div>
                            </div>
                        )}

                        {formData.type === 'venue' && (
                            <div className="info-box" style={{ marginTop: '0' }}>
                                <p>📍 Add latitude and longitude to display your event on the map. You can find coordinates using Google Maps.</p>
                            </div>
                        )}

                        <div className="input-group">
                            <label htmlFor="capacity" className="input-label">Capacity *</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                className="input"
                                placeholder="100"
                                value={formData.capacity}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="image" className="input-label">Event Image URL</label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                className="input"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="info-box">
                            <p>📋 Your event will be submitted for admin approval before being published.</p>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                Create Event
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/company/dashboard')}
                                className="btn btn-outline"
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
