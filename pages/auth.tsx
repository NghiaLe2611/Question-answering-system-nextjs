// pages/login.tsx
import { AppContextType, useAppContext } from '@/contexts/AppContext';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function AuthPage() {
    const { isLoggedIn, setIsLoggedIn } = useAppContext();
    const history = useHistory();

    // Navigate to dashboard if logged in
    useEffect(() => {
        if (history && isLoggedIn) {
            history.push('/');
        }
    }, [history, isLoggedIn]);

    // Handle login logic
    const handleLogin = () => {
        // Perform your login logic here

        // Set isLoggedIn to true upon successful login
        setIsLoggedIn(true);
    };

    // Render your login form
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}
