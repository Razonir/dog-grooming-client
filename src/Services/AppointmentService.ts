import axios from "axios";
import { Appointment } from "../Models/Appointment";

const BASE_API_URL = "https://localhost:44324/api/Appointment";

const CreateAppointment = async (appointment: Appointment) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_API_URL}`, appointment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

const GetAppointments = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetAppointmentsByUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const RemoveAppointmentById = async (AppointmentId: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_API_URL}/`+AppointmentId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { CreateAppointment,RemoveAppointmentById, GetAppointmentsByUserId, GetAppointments };
