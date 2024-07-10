import api from "./index";

export const createCheckoutSession = async (payload, token) => {
  try {
    const response = await api.post(
      "/payment/create-checkout-session",
      payload,
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
