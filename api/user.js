import api from "./index";

export const getCredits = async (token) => {
  console.log(token);
  try {
    const response = await api.get("/user/credits", {
      headers: {
        Authorization: token,
      },
    });

    return response.data.credits;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchImages = async (token) => {
  try {
    const response = await api.get("/images", {
      headers: {
        Authorization: token,
      },
    });

    return response.data.images;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchSavedGames = async (token) => {
  try {
    const response = await api.get("/savedGames", {
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
