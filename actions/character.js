import api from "./index";
import axios from "axios";

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
