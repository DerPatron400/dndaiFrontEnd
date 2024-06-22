import api from "./index";

export const initiateGame = async (payload, token) => {
  console.log(payload);
  try {
    const response = await api.post("/gpt4/chat", payload, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    throw error;
  }
};
