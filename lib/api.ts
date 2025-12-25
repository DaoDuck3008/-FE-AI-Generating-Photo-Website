import axios from "axios";
import { getCldImageUrl } from "next-cloudinary";

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Upload error: ", error);
    throw error;
  }
};

const getStatus = async (jobId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/status/${jobId}`
    );
    return response.data;
  } catch (error) {
    console.error("Status fetch error: ", error);
    throw error;
  }
};

const getImgURL = (jobId: string) => {
  try {
    const ImgURL: string = getCldImageUrl({ src: `potrait_photos/${jobId}` });

    return ImgURL;
  } catch (error) {
    console.error("Get Image URL failed: ", error);
  }
};

const editImage = async (
  file: string,
  bgColor: string,
  size: string,
  brightness: number,
  contrast: number,
  saturation: number,
  printForm: string
) => {
  try {
    const payload = {
      file,
      bgColor,
      size,
      brightness,
      contrast,
      saturation,
      printForm,
    };

    console.log(">>> payload: ", payload);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/edit`,
      payload
    );

    return response.data;
  } catch (error) {
    console.log(">>> Failed to call EditImage API: ", error);
  }
};

export { uploadImage, getStatus, getImgURL, editImage };
