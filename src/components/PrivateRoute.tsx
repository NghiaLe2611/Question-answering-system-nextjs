// // 'use client'
// import { useAppContext } from '@/contexts/AppContext';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { NextComponentType } from "next";

// // Handle authenticated pages
// const withAuth = (WrappedComponent: NextComponentType) => {
//     const WrappedWithAuth: React.FC = (props: any) => {
//         // const history = useHistory();
//         const { user } = useAppContext();
//         const router = useRouter();

//         useEffect(() => {
//             if (!user) {
//                 router.push('/auth');
//             }
//         }, [user, router]);

//         return <WrappedComponent {...props} />;
//     };

//     WrappedWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

//     // if (WrappedComponent.getInitialProps) {
//     //     withAuth.getInitialProps = WrappedComponent.getInitialProps;
//     // }
//     return WrappedWithAuth;
// };


// export default withAuth;

import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useAppContext } from '@/contexts/AppContext';
import { Box, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const withAuth = (WrappedComponent: any) => {
    const WithAuth = (props: any) => {
        const { user, loading } = useAppContext();
        const history = useHistory();

        useEffect(() => {
            if (!user) {
                if (!loading) {
                    Router.push('auth');
                }
            }
        }, [user, loading, history]);

        console.log(user, loading);
        return <WrappedComponent {...props} />;
    };

    // WithAuth.getInitialProps = async (ctx: any) => {
    //     const wrappedComponentInitialProps = WrappedComponent.getInitialProps
    //         ? await WrappedComponent.getInitialProps(ctx)
    //         : {};

    //     return { ...wrappedComponentInitialProps };
    // };

    return WithAuth;
};

export default withAuth;