import { setCookie } from '@/jwt/service';
import { signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import firebaseApp from './config';
import Cookies from 'js-cookie';

const auth = getAuth(firebaseApp);;

// Enable Authenticate sign-in provider email/password in console Firebase
const login = async (email: string, password: string) => {
    let result = null,
        error = null;
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res.user) {
            const { accessToken } = res.user as any;
            setCookie('token', accessToken);
            window.location.href = '/';
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
};

const logOut = async (navigate?: boolean) => {
    console.log('log out');
    try {
        await signOut(auth);
        Cookies.remove('token');
        localStorage.removeItem('exp');
        localStorage.removeItem('apiKey');
        // Handle any additional cleanup or redirection
        if (navigate) {
            window.location.reload();
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export { login, logOut };
