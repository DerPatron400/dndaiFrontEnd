import api from "./index";

export const getImages = async (token, page, sort) => {
  try {
    const response = await api.get(`/user/images?page=${page}&sort=${sort}`, {
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
