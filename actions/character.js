import api from "./index";

export const createCharacter = async (characer, token) => {
  try {
    const response = await api.post("/user/character", characer, {
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

export const getCharacters = async (token) => {
  try {
    const response = await api.get("/user/characters", {
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

export const getCharacter = async (slug) => {
  try {
    const response = await api.get(`/user/character/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const handleGenerateAvatar = async (payload, token) => {
  try {
    const response = await api.post("/user/character/avatar", payload, {
      headers: {
        Authorization: token || null,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const handleUpdateAvatar = async (payload, token) => {
  try {
    const response = await api.post("/user/character/avatar/update", payload, {
      headers: {
        Authorization: token || null,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getCredits = async (token) => {
  try {
    const response = await api.get("/user/credits", {
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
