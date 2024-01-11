import { cookies } from "next/headers";

export const getUid = async (req, res) => {
  const cookieStore = cookies();
  return cookieStore.get("uid").value;
};
