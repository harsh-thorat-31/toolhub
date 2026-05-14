import api from '../api/axios';

export const processImageService = async (
    file,
    width,
    height,
    grayscale
) =>{
    const formData = new FormData();

    formData.append("image", file);

    formData.append("width", width);
    formData.append("height", height);
    formData.append("grayscale", grayscale);

    const response = await  api.post(
        "process-image/", formData,{
            responseType: "blob",
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return response.data; 
}
