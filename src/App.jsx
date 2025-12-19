import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import MyEventsPage from './pages/MyEventsPage';
import QRScanPage from './pages/QRScanPage';
import EventMapPage from './pages/EventMapPage';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import CreateEvent from './pages/company/CreateEvent';
import ManageEvents from './pages/company/ManageEvents';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCompanies from './pages/admin/ManageCompanies';
import ModerateEvents from './pages/admin/ModerateEvents';
import ManageUsers from './pages/admin/ManageUsers';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/map" element={<EventMapPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/my-events" element={<MyEventsPage />} />
              <Route path="/qr-scan" element={<QRScanPage />} />

              {/* Company Routes */}
              <Route
                path="/company/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/create-event"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/manage-events"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <ManageEvents />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/companies"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageCompanies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/moderate"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ModerateEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
