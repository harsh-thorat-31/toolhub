import api from '../api/axios';

export const mergePdfService = async (files) => {
    const formData = new FormData();

    files.forEach((file) =>{
        formData.append("files", file);
    });

    const response = await api.post(
        "merge-pdfs/", formData,
        {
            responseType: "blob",
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
}