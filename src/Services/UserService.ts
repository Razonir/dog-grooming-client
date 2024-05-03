import axios from "axios";
import { User } from "../Models/User";

const BASE_API_URL = "https://localhost:44324/api/User";

const postLogin = async (user: User) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/login`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createContact = async (user: User) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/signup`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { postLogin, createContact,GetUser };
