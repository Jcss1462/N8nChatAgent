import axios from "axios";
import type { AskChatModel } from "../models/AskChatModel";
import type { ResponseChatModel } from "../models/ResponseChatModel";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const askChat = async (payload: AskChatModel): Promise<ResponseChatModel> => {
  return await api.post("", payload);
};
