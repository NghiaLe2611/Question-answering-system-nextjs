'use client';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useAppContext } from '@/contexts/AppContext';
import { login } from '@/firebase/service';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

type LoginPayload = {
    username: string;
    password: string;
};

const LoginForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<LoginPayload>();
    const history = useHistory();
    const router = useRouter();
    const { userInfo } = useAppContext();
    

    useEffect(() => {
        if (userInfo) {
            // router.push('/');
            window.location.href = '/';
        }
    }, [userInfo]);


    // Login with Google username, password
    const handleLogin: SubmitHandler<LoginPayload> = async (values) => {
        const { username, password } = values;

        try {
            const { result, error } = await login(username, password);
            if (error) {
                alert((error as any).code);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box as='form'
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="1px 1px 3px rgba(0,0,0,0.3)"
            onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={3}>
                <FormControl isInvalid={Boolean(errors.username)}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        // onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        {...register('username', {
                            required: 'Username is required',
                        })}
                    />
                    {
                        errors.username && (
                            <FormErrorMessage>
                                {errors.username.message as string}
                            </FormErrorMessage>
                        )
                    }
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        // onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'Password is required',
                        })}
                    />
                    {
                        errors.password && (
                            <FormErrorMessage>
                                {errors.password.message as string}
                            </FormErrorMessage>
                        )
                    }
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Sign In
                </Button>
                <Box textAlign='center'>or</Box>
                <GoogleSignInButton />
            </Stack>
        </Box>
    );
};

function AuthPage(props: any) {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <Box maxW="md" mx="auto" mt={10} p={4} width='100%'>
                <Heading as="h1" size="xl" textAlign="center" mb={5}>
                    Login
                </Heading>
                <LoginForm />
            </Box>
        </div>
    );
}

export default AuthPage;

// Use getServerSideProps for server-side rendering

export const getServerSideProps = async (ctx: any) => {
    const isAuthenticated = ctx.req && ctx.req.cookies.token ? true : false;
    if (isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { isAuthenticated },
    };
};