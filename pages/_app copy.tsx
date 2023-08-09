'use client';
import type { AppProps } from 'next/app';
import { ChakraProvider, Box, Portal, useDisclosure } from '@chakra-ui/react';
import theme from '@/theme/theme';
import routes from '@/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import { AppContextProvider } from '@/contexts/AppContext';

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
