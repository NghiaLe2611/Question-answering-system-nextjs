import { Request, Response } from 'express';
import axios from 'axios';

const setApiKey = async (req: Request, res: Response): Promise<Response> => {
    try {
        const apiKey = req.body.apiKey;

        if (!apiKey) {
            return res.status(400).json({ message: 'API key not found' });
        }

        const response = await axios.post(`${process.env.API_URL}/api-key`, {
            apiKey: apiKey
        });

        if (response.status === 200) {
            return res.status(200).json({ message: 'Success' });
        } else {
            return res.status(response.status).json({ message: 'API key not found' });
        }
    } catch (error) {
        console.error('Error saving API key:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default setApiKey;
