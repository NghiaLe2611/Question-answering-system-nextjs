import jwt from 'jsonwebtoken';

const secrectKey = process.env.SECRECT_KEY as string;

const generateToken = (value: string) => {
    const token = jwt.sign({ value }, secrectKey, { expiresIn: '5m' });
    return token;
};

const decodeToken = (token: string) => {
    try {
        const decodedToken = jwt.verify(token, secrectKey);
        console.log(decodedToken);
    } catch (error: any) {
        console.error('Token verification failed:', error.message);
    }
};

export { generateToken, decodeToken };
