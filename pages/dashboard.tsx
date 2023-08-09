'use client';
import type { AppProps } from 'next/app';
import { Box, Portal, useDisclosure } from '@chakra-ui/react';
import routes from '@/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardContentProps {
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    routes: any; // Replace with the actual type of routes
    apiKey: string;
    onOpen: () => void;
    pathname: string;
    Component: React.ElementType;
    pageProps: any; // Replace with the actual type of pageProps
}

const DashboardContent: React.FC<DashboardContentProps> = ({
    setApiKey,
    routes,
    apiKey,
    onOpen,
    pathname,
    Component,
    pageProps
}) => {
    return (
        <Box>
            {/* ... (rest of the code for Sidebar and Navbar) */}
            <Box mx="auto" display="flex" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
                <Component apiKeyApp={apiKey} {...pageProps} />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    );
};

export default function Dashboard({ Component, pageProps }: AppProps<{}>) {
    const pathname = usePathname();
    const [apiKey, setApiKey] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const initialKey = localStorage.getItem('apiKey');
        if (initialKey?.includes('sk-') && apiKey !== initialKey) {
            setApiKey(initialKey);
        }
    }, [apiKey]);

    return (
        <Box>
            <Sidebar setApiKey={setApiKey} routes={routes} />
            <DashboardContent
                setApiKey={setApiKey}
                routes={routes}
                apiKey={apiKey}
                onOpen={onOpen}
                pathname={pathname}
                Component={Component}
                pageProps={pageProps}
            />
        </Box>
    );
}