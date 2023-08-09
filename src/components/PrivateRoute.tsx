import { useAppContext } from '@/contexts/AppContext'; // Adjust the import path
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Handle authenticated pages
const withAuth = (WrappedComponent: React.ComponentType) => {
    const WrappedWithAuth: React.FC = (props: any) => {
        const { isLoggedIn } = useAppContext();
        const router = useRouter();

        useEffect(() => {
            if (!isLoggedIn) {
                router.push('/auth');
            }
        }, [isLoggedIn, router]);

        return <WrappedComponent {...props} />;
    };

    WrappedWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WrappedWithAuth;
};

export default withAuth;
