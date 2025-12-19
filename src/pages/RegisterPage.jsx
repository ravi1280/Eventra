import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'public',
        companyName: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const { register } = useAuth();
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
        setSuccess('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (formData.role === 'company' && !formData.companyName) {
            setError('Company name is required');
            setLoading(false);
            return;
        }

        const result = register(formData);

        if (result.success) {
            if (result.requiresApproval) {
                setSuccess(result.message);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                navigate('/');
            }
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card glass-card">
                    <div className="auth-header">
                        <h1>Create Account</h1>
                        <p>Join EventHub and start discovering amazing events</p>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label htmlFor="role" className="input-label">I am a...</label>
                            <select
                                id="role"
                                name="role"
                                className="input"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="public">Public User (Attend Events)</option>
                                <option value="company">Company (Organize Events)</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="name" className="input-label">
                                {formData.role === 'company' ? 'Contact Name' : 'Full Name'}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="input"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {formData.role === 'company' && (
                            <>
                                <div className="input-group">
                                    <label htmlFor="companyName" className="input-label">Company Name</label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        className="input"
                                        placeholder="Your Company Name"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="description" className="input-label">Company Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="input"
                                        placeholder="Tell us about your company..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                    />
                                </div>
                            </>
                        )}

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

                        <div className="input-group">
                            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="input"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {formData.role === 'company' && (
                            <div className="info-box">
                                <p>📋 Company accounts require admin approval before you can create events.</p>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
