import api from "./index";

export const newGame = async (characterDetails, token) => {
  try {
    const response = await api.post("/gpt4/chat", characterDetails, {
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

export const newGameGreen = async (characterDetails, token) => {
  try {
    const response = await api.post("/gpt4/chatGreen", characterDetails, {
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

export const sendUserInput = async (userInput, token) => {
  try {
    const response = await api.post("/gpt4/user-input", userInput, {
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

export const sendUserInputGreen = async (userInput, token) => {
  try {
    const response = await api.post("/gpt4/user-inputGreen", userInput, {
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

export const generateImage = async (bodyData, token) => {
  try {
    const response = await api.post(
      "/images/generateImages",
      bodyData,

      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const saveGame = async (gameData, token) => {
  try {
    const response = await api.post("/savedGames/save-game", gameData, {
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

export const saveGameGreen = async (gameData, token) => {
  try {
    const response = await api.post("/savedGames/save-gameGreen", gameData, {
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
