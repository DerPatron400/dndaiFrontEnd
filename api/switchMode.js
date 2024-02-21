import api from "./index";

export const switchMode = async (token) => {
  try {
    console.log("Sending API request with token:", token);

    const response = await api.post(
      "/switchGreen/switch-mode",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};