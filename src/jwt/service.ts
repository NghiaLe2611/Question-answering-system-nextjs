import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const secretKey = process.env.SECRECT_KEY as string;
export const expireTime = 5; // 5m

// Encode access token with secretKey to increase security
export const encodeString = (input: string) => {
    const encoded = CryptoJS.AES.encrypt(JSON.stringify(input), secretKey).toString();
    return encoded;
};

export const decodeString = (encoded: string) => {
    const decrypted = CryptoJS.AES.decrypt(encoded, secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
};

export const setCookie = (name: string, token: string, mins: number = expireTime) => { // default in mins
    const encodedToken = encodeString(token);
    const expirationDate = new Date();
    const expTime = expirationDate.getTime() + mins * 60 * 1000;
    expirationDate.setTime(expTime); 
    Cookies.set(name, encodedToken, { expires: expirationDate });
}

// const encodedString = encodeString(input);
// const decodedString = decodeString(encodedString);