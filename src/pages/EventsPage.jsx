import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { getPublishedEvents, categories } from '../utils/mockData';
import './EventsPage.css';

const EventsPage = () => {
    const [searchParams] = useSearchParams();
    const [events, setEvents] = useState(getPublishedEvents());
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        let filtered = [...events];

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(event => event.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.date) - new Date(b.date);
            } else if (sortBy === 'popular') {
                return b.registered - a.registered;
            }
            return 0;
        });

        setFilteredEvents(filtered);
    }, [selectedCategory, searchQuery, sortBy, events]);

    return (
        <div className="events-page">
            <div className="events-hero">
                <div className="container">
                    <h1 className="events-title">Discover Events</h1>
                    <p className="events-subtitle">Find your next amazing experience</p>
                </div>
            </div>

            <div className="container">

                {/* Filters */}
                <div className="filters-section glass-card">
                    <div className="filter-group">
                        <label className="filter-label">Search</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Category</label>
                        <select
                            className="input"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Sort By</label>
                        <select
                            className="input"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Date</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>
                </div>

                {/* Results */}
                <div className="results-header">
                    <p className="results-count">
                        {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                    </p>
                </div>

                {filteredEvents.length > 0 ? (
                    <div className="events-grid">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3>No events found</h3>
                        <p>Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
