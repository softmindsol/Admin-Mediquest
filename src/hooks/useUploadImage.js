import { useState } from "react";
import { axiosWithToken } from "../api";

const useImageUpload = () => {
  const [isLoading, setLoading] = useState(false);

  const uploadImage = async (image) => {
    setLoading(true);

    try {
      const response = await axiosWithToken.post("/questions/upload-image", {
        image,
      });
      const imageUrl = response.data?.data?.imageUrl;

      console.log(response?.data?.data?.imageUrl, "response--");

      return imageUrl;
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, isLoading };
};

export default useImageUpload;
