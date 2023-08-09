import { signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import firebaseApp from './config';

const auth = getAuth(firebaseApp);;

const login = async (email: string, password: string) => {
    let result = null,
        error = null;
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
    } catch (e) {
        error = e;
    }

    return { result, error };
};

const logOut = async () => {
    try {
        await signOut(auth);
        // Handle any additional cleanup or redirection
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export { login, logOut };
