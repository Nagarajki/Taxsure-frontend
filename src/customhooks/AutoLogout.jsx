import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogout = ({ children }) => {
    const navigate = useNavigate();
    const timer = useRef(null);

    const logout = useCallback(() => {
        localStorage.removeItem('Taxsure'); // Or your auth key
        navigate('/sign-in');
    }, [navigate]);

    const resetTimer = useCallback(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(logout, 15 * 60 * 1000); // 15 minutes
    }, [logout]);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach(event => window.addEventListener(event, resetTimer));
        resetTimer(); // Start timer

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            clearTimeout(timer.current);
        };
    }, [resetTimer]);

    return children;
};

export default AutoLogout;