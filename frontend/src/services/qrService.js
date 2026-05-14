import api from '../api/axios';

export const generateQRService = async(text)=>{
    const response = await api.post("generate-qr/",
        {
            data: text
        },
        {
            responseType: "blob"
        }
    );
    return response.data;
};