import api from "../api/axios";

export const processAudioService = async (
  file,
  format,
  start,
  end
) => {

  const formData = new FormData();

  formData.append("audio", file);

  formData.append("format", format);

  formData.append("start", start);

  formData.append("end", end);

  const response = await api.post(
    "process-audio/",
    formData,
    {
      responseType: "blob",

      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};