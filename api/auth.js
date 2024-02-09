import api from "./index";

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
