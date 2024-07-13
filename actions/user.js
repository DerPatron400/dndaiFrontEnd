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

export const getPublicImages = async (page, sort) => {
  try {
    const response = await api.get(
      `/user/publicImages?page=${page}&sort=${sort}`
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
