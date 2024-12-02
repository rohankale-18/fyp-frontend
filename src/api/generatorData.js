import axiosInstance from "./axiosInstance";

export const getGeneratorData = async () => {
  const response = await axiosInstance.get("/entries");
  return response.data;
};

export const createEntry = async (data) => {
  const response = await axiosInstance.post("/create-entry", data);
  return response.data;
};
