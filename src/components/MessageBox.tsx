import ReactMarkdown from 'react-markdown'
import { useColorModeValue } from '@chakra-ui/react'
import Card from '@/components/card/Card'
import TypingText from './typingText'

export default function MessageBox(props: { output: string }) {
  const { output } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  console.log('message', output);
  return (
    <Card
      display={output ? 'flex' : 'none'}
      py="10px !important"
      // pl="22px !important"
      color={textColor}
      // minH="450px"
      fontSize={{ base: 'sm', md: 'md' }}
      lineHeight={{ base: '24px', md: '26px' }}
      fontWeight="500"
    >
      {/* <ReactMarkdown className="font-medium"> */}
        {/* {output ? output : ''} */}
        <TypingText text={output ? output : ''} />
      {/* </ReactMarkdown> */}
    </Card>
  );
}

{/* <TypingText text={output ? output : ''} onComplete={() => setResponseText('')} /> */}
