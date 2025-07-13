import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const submitAdoptionRequest = async (adoptionData) => {
  const res = await api.post("/adoption-requests", adoptionData);
  return res.data;
};