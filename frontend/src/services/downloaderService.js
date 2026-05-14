import api from '../api/axios';

export const downloadVideoService = async(
    url, type
) => {
    const response = await api.post(
        "download-video/",
        {
            url,
            type
        },
        {
            responseType: "blob"
        }
    );
    return response.data;
}