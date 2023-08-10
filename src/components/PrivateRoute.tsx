import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useAppContext } from '@/contexts/AppContext';
import { Box, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


async function getInitialProps(ctx: any) {
    console.log(222, ctx);

    return {};
}

const withAuth = (WrappedComponent: any) => {
    const WithAuth = ({ ...props }: any) => {
        return <WrappedComponent {...props} />;
    };

    WithAuth.getInitialProps = async (ctx: any) => {
        // const isAuthenticated = ctx.req.cookies ? true : false;
        const isAuthenticated = false;
        if (!isAuthenticated) {
            if (ctx.res) {
                ctx.res.writeHead(307, { Location: '/auth' });
                ctx.res.end();
            }

            // Return an empty object,
            // otherwise Next.js will throw an error
            return {};
        }

        return {
            props: {
                isAuthenticated
            }
        };
    };

    return WithAuth;
};

export default withAuth;