import api from "../api/axios";

export const createShortUrlService = async (url) => {
    const response = await api.post("create-short-url/",
        {
            url
        }
    );
    return response.data;
}