import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = login(formData.email, formData.password);

        if (result.success) {
            // Redirect based on role
            if (result.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (result.user.role === 'company') {
                navigate('/company/dashboard');
            } else {
                navigate('/');
            }
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    // Demo credentials helper
    const fillDemo = (role) => {
        const demoCredentials = {
            admin: { email: 'admin@eventpub.com', password: 'admin123' },
            company: { email: 'techcorp@company.com', password: 'company123' },
            public: { email: 'user@example.com', password: 'user123' }
        };
        setFormData(demoCredentials[role]);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card glass-card">
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your EventHub account</p>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="input"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="input-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>Demo Accounts</span>
                    </div>

                    <div className="demo-buttons">
                        <button onClick={() => fillDemo('admin')} className="btn btn-ghost btn-sm">
                            👑 Admin
                        </button>
                        <button onClick={() => fillDemo('company')} className="btn btn-ghost btn-sm">
                            🏢 Company
                        </button>
                        <button onClick={() => fillDemo('public')} className="btn btn-ghost btn-sm">
                            👤 Public User
                        </button>
                    </div>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
