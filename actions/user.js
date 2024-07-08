import api from "./index";

export const getImages = async (token) => {
  try {
    const response = await api.get("/user/images", {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
