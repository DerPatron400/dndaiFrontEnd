import api from "./index";

export const createCampaign = async (campaign, token) => {
  try {
    const response = await api.post("/campaign", campaign, {
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

export const getCampaignsByUser = async (token) => {
  try {
    const response = await api.get("/campaign/user", {
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

export const getCampaignBySlug = async (slug) => {
  try {
    const response = await api.get(`/campaign/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
