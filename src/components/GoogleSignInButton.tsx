import firebaseApp from '@/firebase/config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import googleBtn from '../../public/img/google-btn.png';

const GoogleSignInButton = () => {
    const auth = getAuth(firebaseApp);

    const handleGoogleSignIn = async (e: any) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            // console.log('handleGoogleSignIn ', res);
            // User signed in
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <button onClick={handleGoogleSignIn}>
            <Image
                src={googleBtn}
                alt="Sign in with Google"
            />
        </button>
    );
};

export default GoogleSignInButton;
