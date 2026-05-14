import api from "../api/axios";

export const analyzeResumeService = async (file) => {

  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "analyze-resume/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};