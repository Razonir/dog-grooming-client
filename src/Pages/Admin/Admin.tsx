import React, { useState, useEffect } from "react";
import "./Admin.scss";
import {
  GetAppointments,
  GetAppointmentsByUserId,
  RemoveAppointmentById,
} from "../../Services/AppointmentService.ts";
import { Appointment } from "../../Models/Appointment";
import { User } from "../../Models/User.ts";
import { GetUser } from "../../Services/UserService.ts";
import { Link } from "react-router-dom";

export default function Admin() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User>();
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleRemoveAppointmentById = async (appointmentId: number) => {
    try {
      const res = await RemoveAppointmentById(appointmentId);
      console.log("Appointment Removed successfully!", res);
      fetchData();
    } catch (error) {
      console.error("Error removing appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = appointment.appointmentDate
      ? new Date(appointment.appointmentDate)
      : null;

    if (
      nameFilter &&
      !appointment.user?.firstName
        .toLowerCase()
        .includes(nameFilter.toLowerCase())
    ) {
      return false;
    }

    const isSameDay =
      appointmentDate &&
      appointmentDate.getDate() === dateFilter?.getDate() &&
      appointmentDate.getMonth() === dateFilter?.getMonth() &&
      appointmentDate.getFullYear() === dateFilter?.getFullYear();

    if (dateFilter instanceof Date && !isNaN(dateFilter) && !isSameDay) {
      return false;
    }

    return true;
  });

  const openPopup = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const closePopup = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="Admin">
      <h1>
        ממשק ניהול
        <span onClick={() => (window.location.href = "/dashboard")}>
          חזרה לדף הבית
        </span>
      </h1>
      <div className="Admin-bottom">
        <div className="Admin-card">
          <div className="appointments">
            <div className="filters">
              <input
                type="date"
                onChange={(e) => setDateFilter(new Date(e.target.value))}
              />
              <input
                type="text"
                placeholder="חיפוש לפי שם"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>סטטוס</th>
                  <th>תאריך התור</th>
                  <th>שם פרטי</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => {
                  const appointmentDate = new Date(
                    appointment.appointmentDate || new Date()
                  );
                  return (
                    <tr
                      key={index}
                      className={appointmentDate > new Date() ? "new" : "old"}
                      onClick={() => openPopup(appointment)}
                    >
                      <td>
                        {appointmentDate > new Date() ? "עתידי" : "תור ישן"}
                      </td>
                      <td>
                        <div>
                          {appointmentDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div style={{ fontSize: "0.7em" }}>
                          {appointmentDate
                            .toISOString()
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
                        </div>
                      </td>
                      <td>{appointment.user?.firstName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <img src="assets/dog.png" alt="" />
      </div>
      {selectedAppointment && (
        <div className="popup">
          <span className="close" onClick={closePopup}>
            &times; סגור
          </span>
          <div className="popup-content">
            <h2>פרטי התור</h2>
            <p>שם פרטי: {selectedAppointment.user?.firstName}</p>
            <p>שם משתמש: {selectedAppointment.user?.userName}</p>
            <p>
              תאריך התור:
              {selectedAppointment.appointmentDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <p>
              שעת התור:
              {selectedAppointment.appointmentDate.slice(11, 16)}
            </p>
            <br />
            <hr />
            <br />
            <p>
              תאריך יצירת התור:
              {selectedAppointment.registerDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <p>
              שעת יצירת התור:
              {selectedAppointment.registerDate.slice(11, 16)}
            </p>
            <div
              className="cancel"
              onClick={() => {
                handleRemoveAppointmentById(selectedAppointment?.appointmentId || 0);
                closePopup();
                fetchData();
              }}
            >
              לביטול התור
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
