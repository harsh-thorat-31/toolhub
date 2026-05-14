import api from "../api/axios";

export const generatePasswordService = async (payload) => {
    const response = await api.post("generate-password/", payload);

    return response.data;
};