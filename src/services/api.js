import axios from "axios";

const key = localStorage.getItem("chatUser");
const token = JSON.parse(key);

export const BACKEND_URL = `https://chat-app-mern-backend.onrender.com`;
// export const BACKEND_URL = `http://localhost:5000`;
const Api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    Authorization: key ? `Bearer ${token}` : "",
  },
});

export const signup = async (data) => {
  try {
    const res = await Api.post(`/users/signup`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginapi = async (data) => {
  try {
    const res = await Api.post(`/users/login`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const myInfo = async () => {
  try {
    const res = await Api.get(`/users/me`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await Api.get(`/users`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getAllMyChats = async () => {
  try {
    const res = await Api.get(`/chats`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const startSingleChat = async (data) => {
  try {
    const res = await Api.post(`/chats/newchat`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getSingleChat = async (id) => {
  try {
    const res = await Api.get(`/chats/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const sendMessage = async (data) => {
  try {
    const res = await Api.post(`/messages`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const newGroup = async (data) => {
  try {
    const res = await Api.post(`/chats/newgroup`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const sendMediaMessage = async (data) => {
  try {
    const res = await Api.post(`/messages/media`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
