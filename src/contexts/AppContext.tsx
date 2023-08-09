
import firebaseApp from '@/firebase/config';
import { logOut } from '@/firebase/service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface AppContextType {
    user: any;
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

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const existedUser = localStorage.getItem('user');
        if (existedUser) {
            const parsedUser = JSON.parse(existedUser);
           
        }
    }, []);
    // console.log('loading', loading);
    useEffect(() => {

        const existedUser = localStorage.getItem('user');

        if (existedUser) {
            const parsedUser = JSON.parse(existedUser as any);
            const lastLoginAt = parsedUser.lastLoginAt;
            const now = Date.now();
            const fiveMins = 5 * 60 * 1000;

            if (now - lastLoginAt > fiveMins) {
                // Log out if more than 5 mins
                logOut();
            } else {
                console.log('still login');
                setUser(parsedUser);
                setLoading(false);
            }

            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('onAuthStateChanged', user);
            // lastLoginAt, createdAt
            if (user) {
                const { accessToken, displayName, email, metadata, photoURL } = user as any;
                const data = {
                    displayName, email, photoURL, lastLoginAt: metadata.lastLoginAt
                };
                setUser(data as any);
                setLoading(false);
                localStorage.setItem('user', JSON.stringify(data));

            } else {
                setUser(null);
                setLoading(false);
                localStorage.removeItem('user');
            }
        });

        return () => unsubscribe(); // clean up
    }, []);

    return <AppContext.Provider value={{ user, loading }}>{children}</AppContext.Provider>;
};
