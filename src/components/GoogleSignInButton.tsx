import firebaseApp from '@/firebase/config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import googleBtn from '../../public/img/google-btn.png';

// Enable Authenticate sign-in provider Google in console Firebase
const GoogleSignInButton = () => {
    const auth = getAuth(firebaseApp);
    // const router = useRouter();

    const handleGoogleSignIn = async (e: any) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            if (res && res.user) {
                // router.push('/')
                window.location.reload();
            }
            // console.log('handleGoogleSignIn ', res);
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
