// pages/login.tsx
import { AppContextType, useAppContext } from '@/contexts/AppContext';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function AuthPage() {
    const router = useRouter();
    const { isLoggedIn, setIsLoggedIn } = useAppContext();

    // Handle login logic
    const handleLogin = () => {
        // Perform your login logic here

        // Set isLoggedIn to true upon successful login
        setIsLoggedIn(true);
    };

    if (isLoggedIn) {
        // Redirect to dashboard if already logged in
        router.push('/'); // Redirect to dashboard or any other page
        return null;
    }

    // Render your login form
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}
