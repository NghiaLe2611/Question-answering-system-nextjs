
import firebaseApp from '@/firebase/config';
import { logOut } from '@/firebase/service';
import { decodeString, setCookie } from '@/jwt/service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export interface AppContextType {
    userInfo: any;
    loading?: boolean;
}

type AppContextProviderProps = {
    children: ReactNode;
};

const auth = getAuth(firebaseApp);

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};


const cookieToken = Cookies.get('token');

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

    const decodedToken = useMemo(() => {
        if (cookieToken) {
            return decodeString(cookieToken as string);
        }
        return "";
    }, []);

    const [userInfo, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const cookieToken = Cookies.get('token');
        const expStorage = localStorage.getItem('exp') ? Number(localStorage.getItem('exp')) : null;

        // Check timestamp now > expire time to handle logout
        if (expStorage) {
            if (new Date().getTime() > expStorage) {
                logOut();
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            const { accessToken, displayName, photoURL, email, metadata } = user as any;
            console.log('onAuthStateChanged', user);
            setUser({
                displayName: displayName ? displayName : 'User', photoURL
            });
            setCookie('token', accessToken);

            // Check expire time to log out
            if (!expStorage) {
                const expTime = new Date().getTime() + 5 * 60 * 1000; //5m
                console.log(expTime);
                localStorage.setItem('exp', expTime.toString());
            }
        });


        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return <AppContext.Provider value={{ userInfo }}>{children}</AppContext.Provider>;
};
