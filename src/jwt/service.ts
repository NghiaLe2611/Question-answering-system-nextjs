import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const secretKey = process.env.SECRECT_KEY as string;

// Encode access token with secretKey to increase security
export const encodeString = (input: string) => {
    const encoded = CryptoJS.AES.encrypt(input, secretKey).toString();
    return encoded;
};

export const decodeString = (encoded: string) => {
    const decrypted = CryptoJS.AES.decrypt(encoded, secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
};

export const setCookie = (name: string, token: string, mins: number = 5) => {
    const encodedToken = encodeString(token);
    const expirationDate = new Date();
    const expTime = expirationDate.getTime() + mins * 60 * 1000; // 1m
    expirationDate.setTime(expTime); 
    Cookies.set(name, encodedToken, { expires: expirationDate });
}

// const encodedString = encodeString(input);
// const decodedString = decodeString(encodedString);