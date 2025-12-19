import { Link } from 'react-router-dom';
import { useState } from 'react';
import EventCard from '../components/EventCard';
import { getFeaturedEvents, getPublishedEvents, categories } from '../utils/mockData';
import './HomePage.css';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const featuredEvents = getFeaturedEvents();
    const upcomingEvents = getPublishedEvents().slice(0, 6);

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to events page with search query
        window.location.href = `/events?search=${searchQuery}`;
    };

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title animate-fadeIn">
                            Discover Amazing Events Near You
                        </h1>
                        <p className="hero-subtitle animate-fadeIn">
                            Connect with thousands of events happening around the world. From tech conferences to art exhibitions, find your next experience.
                        </p>

                        <form onSubmit={handleSearch} className="hero-search animate-fadeIn">
                            <div className="search-box">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search for events, categories, or locations..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary">
                                    Search
                                </button>
                            </div>
                        </form>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">500+</div>
                                <div className="stat-label">Active Events</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">10K+</div>
                                <div className="stat-label">Happy Attendees</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">100+</div>
                                <div className="stat-label">Event Organizers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Browse by Category</h2>
                        <p>Explore events across different categories</p>
                    </div>

                    <div className="categories-grid">
                        {categories.map(category => (
                            <Link
                                to={`/events?category=${category.name}`}
                                key={category.id}
                                className="category-card glass-card"
                                style={{ '--category-color': category.color }}
                            >
                                <div className="category-icon">{category.icon}</div>
                                <div className="category-name">{category.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Events</h2>
                        <p>Don't miss these handpicked events</p>
                    </div>

                    <div className="events-grid">
                        {featuredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="upcoming-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Upcoming Events</h2>
                        <p>Discover what's happening soon</p>
                    </div>

                    <div className="events-grid">
                        {upcomingEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    <div className="section-footer">
                        <Link to="/events" className="btn btn-outline">
                            View All Events
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content glass-card">
                        <h2>Ready to Host Your Own Event?</h2>
                        <p>Join hundreds of organizers who trust EventHub to manage their events</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Get Started
                            </Link>
                            <Link to="/events" className="btn btn-outline btn-lg">
                                Browse Events
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
