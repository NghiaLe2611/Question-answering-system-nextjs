'use client';
/*eslint-disable*/
import Footer from '@/components/footer/FooterAdmin';
import Link from '@/components/link/Link';
import MessageBoxChat from '@/components/MessageBox';
import Navbar from '@/components/navbar/NavbarAdmin';
import Sidebar from '@/components/sidebar/Sidebar';
import routes from '@/routes';
import { OpenAIModel } from '@/types/types';
import { getActiveNavbar, getActiveRoute } from '@/utils/navigation';
import {
    Box,
    Button,
    Flex,
    Icon,
    Img,
    Input,
    Portal,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { MdAutoAwesome, MdEdit, MdPerson, MdSend } from 'react-icons/md';
import Bg from '../public/img/chat/bg-image.png';

const BoxItem = memo(({ question, answer }: { question: string; answer: string; }) => {
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
    const brandColor = useColorModeValue('brand.500', 'white');
    const gray = useColorModeValue('gray.500', 'white');
    const textColor = useColorModeValue('navy.700', 'white');

    const isDisplay = question && question !== '' && answer && answer !== '';
    // console.log('BoxItem', question, answer);

    return (
        <Flex
            className="box-item"
            direction="column"
            w="100%"
            mx="auto"
            display={isDisplay ? 'flex' : 'none'}
            mb="50px"
        // mb={'auto'}
        >
            {/* Question */}
            <Flex w="100%" align={'center'} mb="10px">
                <Flex
                    borderRadius="full"
                    justify="center"
                    align="center"
                    bg={'transparent'}
                    border="1px solid"
                    borderColor={borderColor}
                    me="20px"
                    h="40px"
                    minH="40px"
                    minW="40px"
                >
                    <Icon as={MdPerson} width="20px" height="20px" color={brandColor} />
                </Flex>

                <Flex p="22px" border="1px solid" borderColor={borderColor} borderRadius="14px" w="100%" zIndex={'2'}>
                    <Text
                        color={textColor}
                        fontWeight="600"
                        fontSize={{ base: 'sm', md: 'md' }}
                        lineHeight={{ base: '24px', md: '26px' }}
                    >
                        {question ? question : ''}
                    </Text>
                    <Icon cursor="pointer" as={MdEdit} ms="auto" width="20px" height="20px" color={gray} />
                </Flex>
            </Flex>

            {/* Answer */}
            <Flex w="100%" align={'flex-start'}>
                <Flex
                    borderRadius="full"
                    justify="center"
                    align="center"
                    bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
                    me="20px"
                    h="40px"
                    minH="40px"
                    minW="40px"
                >
                    <Icon as={MdAutoAwesome} width="20px" height="20px" color="white" />
                </Flex>
                <MessageBoxChat output={answer ? answer : ''} />
            </Flex>
        </Flex>
    );
});

function Chat(props: any) {
    // *** If you use .env.local variable for your API key, method which we recommend, use the apiKey variable commented below
    const pathname = usePathname();
    const [apiKey, setApiKey] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isAuthenticated } = props.props || false;

    // Input States
    const [inputOnSubmit, setInputOnSubmit] = useState<string>('');
    const [inputCode, setInputCode] = useState<string>('');
    // Response message
    const [outputCode, setOutputCode] = useState<string>('');
    // ChatGPT model
    const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // List of question and answer
    const [data, setData] = useState<any[]>([]);

    // API Key
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
    const inputColor = useColorModeValue('navy.700', 'white');
    const iconColor = useColorModeValue('brand.500', 'white');
    const bgIcon = useColorModeValue('linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)', 'whiteAlpha.200');
    const brandColor = useColorModeValue('brand.500', 'white');
    const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
    const gray = useColorModeValue('gray.500', 'white');
    const buttonShadow = useColorModeValue('14px 27px 45px rgba(112, 144, 176, 0.2)', 'none');
    const textColor = useColorModeValue('navy.700', 'white');
    const placeholderColor = useColorModeValue({ color: 'gray.500' }, { color: 'whiteAlpha.600' });

    useEffect(() => {
        const initialKey = localStorage.getItem('apiKey');
        if (initialKey?.includes('sk-') && apiKey !== initialKey) {
            setApiKey(initialKey);
        }
    }, [apiKey]);

    // Append pair question-answer
    const handleSetData = (res: any) => {
        setData((prev) => {
            const newData = [
                ...prev,
                {
                    question: res.question ? res.question : '',
                    answer: res.answer ? res.answer : ''
                }
            ];
            return newData;
        });
    };

    const handleTranslate = async () => {
        // setInputOnSubmit(inputCode);
        handleSetData({
            question: inputCode
        });

        // Chat post conditions(maximum number of characters, valid message etc.)
        const maxCodeLength = model === 'gpt-3.5-turbo' ? 700 : 700;

        if (!apiKey?.includes('sk-') && !apiKey?.includes('sk-')) {
            alert('Please enter an API key.');
            return;
        }

        if (!inputCode) {
            alert('Please enter your message.');
            return;
        }

        if (inputCode.length > maxCodeLength) {
            alert(
                `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`
            );
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.API_URL}/process`, {
                question: inputCode,
                file_path: 'uploads/phuhung.txt',
                api_key: localStorage.getItem('apiKey')
            });

            const { answer } = response.data;
            // Update the answer for the question in the data array
            handleSetData({
                question: inputCode,
                answer
            });
            // setOutputCode(answer);

            setInputCode(''); // clear input question
            setLoading(false);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };

    const handleChange = (e: any) => {
        setInputCode(e.target.value);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleTranslate();
        }
    };

    const clearInput = () => {
        setInputCode('');
    };

    return (
        <>
            <Head>
                <title>Question Answering System</title>
            </Head>
            <Box>
                <Sidebar setApiKey={setApiKey} routes={routes} />
                <Box
                    pt={{ base: '60px', md: '100px' }}
                    float="right"
                    minHeight="100vh"
                    height="100%"
                    overflow="auto"
                    position="relative"
                    maxHeight="100%"
                    w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                    maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                    transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                    transitionDuration=".2s, .2s, .35s"
                    transitionProperty="top, bottom, width"
                    transitionTimingFunction="linear, linear, ease"
                >
                    <Portal>
                        <Box>
                            <Navbar
                                setApiKey={setApiKey}
                                onOpen={onOpen}
                                logoText={'Question Answering System'}
                                brandText={getActiveRoute(routes, pathname)}
                                secondary={getActiveNavbar(routes, pathname)}
                            />
                        </Box>
                    </Portal>
                    <Box mx="auto" display="flex" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
                        <Flex w="100%" pt={{ base: '70px', md: '0px' }} direction="column" position="relative">
                            <Img
                                src={Bg.src}
                                position={'absolute'}
                                w="0px"
                                left="50%"
                                top="50%"
                                transform={'translate(-50%, -50%)'}
                            />
                            <Flex
                                direction="column"
                                mx="auto"
                                w={{ base: '100%', md: '100%', xl: '100%' }}
                                minH={{ base: '75vh', '2xl': '85vh' }}
                                maxW="1000px"
                            >
                                {/* 
                                    <Flex direction={'column'} w="100%" mb={outputCode ? '20px' : 'auto'}>
                                        <Flex mx="auto" zIndex="2" w="max-content" mb="20px" borderRadius="60px"></Flex>
                                    </Flex> 
                                */}

                                {/* Main Box */}
                                {data.length > 0 &&
                                    data.map((item: any, index) => (
                                        <BoxItem
                                            key={index + `${item.question}`}
                                            question={item.question}
                                            answer={item.answer}
                                        />
                                    ))}

                                {/* Chat Input */}
                                <Flex ms={{ base: '0px', xl: '60px' }} mt="auto" justifySelf={'flex-end'}>
                                    <Input
                                        minH="54px"
                                        h="100%"
                                        border="1px solid"
                                        borderColor={borderColor}
                                        borderRadius="45px"
                                        p="15px 20px"
                                        me="10px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        _focus={{ borderColor: 'none' }}
                                        color={inputColor}
                                        _placeholder={placeholderColor}
                                        placeholder="Type your message here..."
                                        value={inputCode}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {/* <Button
                        variant="primary"
                        py="20px"
                        px="16px"
                        fontSize="sm"
                        borderRadius="45px"
                        ms="auto"
                        w={{ base: '160px', md: '210px' }}
                        h="54px"
                        _hover={{
                            boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                            bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                            _disabled: {
                                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'
                            }
                        }}
                        onClick={handleTranslate}
                        isLoading={loading ? true : false}
                    >
                        Ask
                    </Button> */}
                                    <Tooltip label="Send a message">
                                        <Button
                                            py="20px"
                                            fontSize="sm"
                                            ms="auto"
                                            _hover={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                            _active={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                            h="54px"
                                            onClick={handleTranslate}
                                            disabled={loading ? true : false}
                                        >
                                            <Icon as={MdSend} width="20px" height="20px" color={brandColor} />
                                        </Button>
                                    </Tooltip>
                                </Flex>

                                <Flex
                                    justify="center"
                                    mt="20px"
                                    direction={{ base: 'column', md: 'row' }}
                                    alignItems="center"
                                >
                                    <Text fontSize="xs" textAlign="center" color={gray}>
                                        Free Research Preview. ChatGPT may produce inaccurate information about people,
                                        places, or facts.
                                    </Text>
                                    <Link href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes">
                                        <Text
                                            fontSize="xs"
                                            color={textColor}
                                            fontWeight="500"
                                            textDecoration="underline"
                                        >
                                            ChatGPT May 12 Version
                                        </Text>
                                    </Link>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box>
                        <Footer />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

// export default withAuth(Chat);
export default Chat;

export const getServerSideProps = async (ctx: any) => {
    const isAuthenticated = ctx.req && ctx.req.cookies.token ? true : false;
    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    return {
        props: { isAuthenticated },
    };
};