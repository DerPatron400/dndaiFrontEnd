import api from "./index";

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post("/auth/signup", username, email, password);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const requestPasswordReset = async (email, redirectURL) => {
  try {
    const response = await api.post("/auth/request-password-reset", {
      email,
      redirectURL,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const resetPassword = async (password, resetToken) => {
  try {
    const response = await api.post("/auth/reset-password", {
      password,
      resetToken,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
