import axios from 'axios';

const uploadFileAPI = async (filePath: string): Promise<string> => {
  try {
    const response = await axios.post(`${process.env.API_URL}/upload-file`, {
      file: filePath, 
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return Promise.reject('Error uploading file');
  }
};

export default uploadFileAPI;
