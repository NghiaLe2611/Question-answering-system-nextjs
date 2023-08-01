import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type props = {
	text: string;
	onComplete?: any;
	speed?: number;
};

const TypingText = ({ text, onComplete, speed = 20 }: props) => {
	const [isTyping, setIsTyping] = useState(true);
	const [displayText, setDisplayText] = useState('');
	
	useEffect(() => {
		const typingInterval = setInterval(() => {
			const currentLength = displayText.length;
			const targetLength = text.length;

			if (currentLength < targetLength) {
				setDisplayText(text.slice(0, currentLength + 1));
			} else {
				setIsTyping(false);
				clearInterval(typingInterval);
				if (onComplete) {
					onComplete();
				}
			}
		}, speed); // Adjust the typing speed here (milliseconds)

		return () => clearInterval(typingInterval);
	}, [speed, text, displayText, onComplete]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{displayText}
		</motion.div>
	);
};

export default TypingText;
