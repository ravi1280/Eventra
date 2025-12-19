import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../utils/mockData';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user session
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const user = mockUsers.find(
            u => u.email === email && u.password === password
        );

        if (user) {
            // Check if company is approved
            if (user.role === 'company' && user.status !== 'approved') {
                return { success: false, message: 'Your company account is pending approval' };
            }

            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            setCurrentUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            return { success: true, user: userWithoutPassword };
        }

        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        // Check if email already exists
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: mockUsers.length + 1,
            ...userData,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=667eea&color=fff`,
            status: userData.role === 'company' ? 'pending' : 'active',
            registeredEvents: []
        };

        mockUsers.push(newUser);

        if (userData.role === 'company') {
            return {
                success: true,
                message: 'Registration successful! Your account is pending admin approval.',
                requiresApproval: true
            };
        }

        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;

        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateUser = (updates) => {
        const updatedUser = { ...currentUser, ...updates };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    const isAdmin = () => currentUser?.role === 'admin';
    const isCompany = () => currentUser?.role === 'company';
    const isPublic = () => currentUser?.role === 'public';

    const value = {
        currentUser,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAdmin,
        isCompany,
        isPublic,
        isAuthenticated: !!currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { currentUser, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        window.location.href = '/login';
        return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
        window.location.href = '/';
        return null;
    }

    return children;
};
