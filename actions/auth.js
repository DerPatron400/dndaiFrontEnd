import api from "./index";
import axios from "axios";
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });

    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    throw error;
  }
};

export const register = async (user) => {
  try {
    const response = await api.post("/auth/signup", user);

    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data.message);
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
    console.error("Error:", error.response.data.message);
    throw error;
  }
};

export const resetPassword = async (password, resetToken) => {
  try {
    const response = await api.post("/auth/reset-password", {
      password,
      resetToken,
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const continueWithGoogle = async (user) => {
  try {
    const userData = await getUserData(user);
    console.log(userData);
    const response = await api.post("/auth/google", userData);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getUserData = async (user) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // rethrow the error to be caught by the error handler in useMutation
  }
};

export const verifyEmailExists = async (email) => {
  try {
    const response = await api.post("/auth/verify-email", { email });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const verifyUserNameExists = async (username) => {
  try {
    const response = await api.post("/auth/check-username", { username });

    return response.data.exists;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
