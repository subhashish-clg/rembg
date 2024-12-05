import axiosClient from "./client";

export const rembg = async (formData: FormData) => {
  const response = axiosClient.post("/remove/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });

  return response;
};
