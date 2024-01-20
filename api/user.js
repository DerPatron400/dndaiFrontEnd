import api from "./index";

export const getCredits = async (id) => {
  try {
    const response = await api.get("/user/credits?_id=" + id);

    return response.data.credits;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
