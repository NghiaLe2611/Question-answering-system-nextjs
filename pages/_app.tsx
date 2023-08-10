'use client';
import { AppContextProvider } from '@/contexts/AppContext';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/MiniCalendar.css';
import '@/styles/Plugins.css';
import theme from '@/theme/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

// { Component, pageProps, isAuthenticated }: AppProps & { isAuthenticated: boolean; }
function App({ Component, pageProps }: AppProps<{}>) {
    return (
        <ChakraProvider theme={theme}>
            <AppContextProvider>
                <Component {...pageProps} />
            </AppContextProvider>
        </ChakraProvider>
    );
}

export default App;