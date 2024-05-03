import React, { useEffect, useState } from "react";
import "./AddAppointment.scss";
import { User } from "../../Models/User";
import { Appointment } from "../../Models/Appointment";
import { GetUser } from "../../Services/UserService.ts";
import {
  CreateAppointment,
  GetAppointments,
} from "../../Services/AppointmentService.ts";

interface Props {}

const AddAppointment: React.FC<Props> = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await GetUser();
        setUser(user);
        const data = await GetAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(new Date(date));
  };

  const isSlotAvailable = (time: string) => {
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(parseInt(time.split(":")[0], 10), 0, 0, 0);
    const currentTime = new Date();
    if (selectedDateTime < currentTime) {
      return false;
    }
    return !appointments.some((appointment) => {
      const appointmentDateTime = appointment.appointmentDate
        ? new Date(appointment.appointmentDate)
        : null;
      if (appointmentDateTime) {
        return (
          appointmentDateTime.getFullYear() ===
            selectedDateTime.getFullYear() &&
          appointmentDateTime.getMonth() === selectedDateTime.getMonth() &&
          appointmentDateTime.getDate() === selectedDateTime.getDate() &&
          appointmentDateTime.getHours() === selectedDateTime.getHours() &&
          appointmentDateTime.getMinutes() === selectedDateTime.getMinutes()
        );
      }
      return false;
    });
  };

  const renderTimeSlots = () => {
    const timeSlots: JSX.Element[] = [];

    const dayIndex = selectedDate.getDay();

    if (dayIndex >= 0 && dayIndex <= 4) {
      for (let i = 9; i <= 16; i++) {
        const time = `${i < 10 ? "0" : ""}${i}:00`;
        const isAvailable = isSlotAvailable(time);
        timeSlots.push(
          <button
            key={time}
            style={{
              backgroundColor: isAvailable ? "rgba(255,255,255, 1)" : "gray",
              pointerEvents: isAvailable ? "auto" : "none",
              cursor: isAvailable ? "pointer" : "none",
            }}
            disabled={!isAvailable}
            onClick={() => handleAppointmentCreation(time)}
          >
            {time}
          </button>
        );
      }
    } else if (dayIndex == 5 || dayIndex == 6) {
      timeSlots.push(<p key="noSlots">העסק לא פתוח בשבת</p>);
    } else {
      timeSlots.push(<p key="noSlots">אין תורים פנויים נסה יום אחר</p>);
    }
    return timeSlots;
  };

  const handleAppointmentCreation = async (time: string) => {
    const now = new Date();
    const appointmentDate = new Date(selectedDate);
    const [hours, minutes] = time.split(":").map(Number);
    appointmentDate.setHours(hours + 3, minutes, 0, 0);
    now.setHours(now.getHours() + 3);
    const appointment: Appointment = {
      registerDate: now,
      appointmentDate: appointmentDate,
    };

    try {
      const appointmentres = await CreateAppointment(appointment);
      console.log("Appointment created successfully!", appointmentres);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="AddAppointment">
      <h1>
        קביעת תור
        <span onClick={() => (window.location.href = "/dashboard")}>
          חזרה לדף הבית
        </span>
      </h1>
      <div className="add-bottom">
        <div className="add-card">
          <div className="calendar">
            <label>בחירת תאריך</label>
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
          <div className="time-slots">{renderTimeSlots()}</div>
        </div>
        <img src="assets/dog.png" alt="" />
      </div>
    </div>
  );
};

export default AddAppointment;
