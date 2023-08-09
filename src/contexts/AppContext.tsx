import { createContext, ReactNode, useContext, useState } from 'react';

export interface AppContextType {
    isLoggedIn?: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

type AppContextProviderProps = {
    children: ReactNode;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AppContext.Provider>;
};
