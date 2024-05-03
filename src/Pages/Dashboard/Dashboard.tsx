import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import {
  GetAppointmentsByUserId,
  RemoveAppointmentById,
} from "../../Services/AppointmentService.ts";
import { Appointment } from "../../Models/Appointment";
import { User } from "../../Models/User.ts";
import { GetUser } from "../../Services/UserService.ts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const user = await GetUser();
      console.log(user);
      setUser(user);
      const data = await GetAppointmentsByUserId();
      setAppointments(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleRemoveAppointmentById = async (appointmentId: number) => {
    try {
      const res = await RemoveAppointmentById(appointmentId);
      console.log("Appointment Rmoved successfully!", res);
      fetchData();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="Dashboard">
      <h1>
        שלום {user?.firstName}
        <span
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          התנתק מהמערכת
        </span>
      </h1>{" "}
      <Link to="/add" className="button">
        לקביעת תור לחץ כאן
      </Link>
      <div className="dashboard-bottom">
        <div className="dashboard-card">
          <h3>התורים שלי</h3>
          <br />
          <hr />
          <br />
          {appointments.length === 0 ? (
            <div className="empty">לא קיים תורים</div>
          ) : (
            <div className="appointments">
              {appointments.map((appointment) => {
                const appointmentDate = new Date(
                  appointment.appointmentDate || new Date()
                );

                if (appointmentDate > new Date()) {
                  return (
                    <div
                      key={appointment.appointmentId}
                      className="appointment"
                    >
                      <div>
                        {appointment.registerDate && (
                          <span>
                            <strong>מתי קבעתי את התור:</strong>
                            <br />
                            {new Date(
                              appointment.registerDate
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            -
                            {new Date(appointment.registerDate)
                              .toISOString()
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("/")}
                          </span>
                        )}
                      </div>
                      <span>
                        <br />
                        <strong>שעת התור:</strong>
                        <br />
                        {appointmentDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        -
                        {appointmentDate
                          .toISOString()
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}
                        <div
                          className="cancel"
                          onClick={() => {
                            handleRemoveAppointmentById(
                              appointment?.appointmentId || 0
                            );
                          }}
                        >
                          לביטול התור
                        </div>
                      </span>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          <br />
          <br />

          <h3>התורים שזמנם עבר</h3>
          <br />
          <hr />
          <br />
          {appointments.length === 0 ? (
            <div className="empty">לא קיים תורים</div>
          ) : (
            <div className="appointments">
              {appointments.map((appointment) => {
                const appointmentDate = new Date(
                  appointment.appointmentDate || new Date()
                );

                if (appointmentDate < new Date()) {
                  return (
                    <div
                      key={appointment.appointmentId}
                      className="appointment"
                    >
                      <div>
                        {appointment.registerDate && (
                          <span>
                            <strong>מתי קבעתי את התור:</strong>
                            <br />
                            {new Date(
                              appointment.registerDate
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            -
                            {new Date(appointment.registerDate)
                              .toISOString()
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("/")}
                          </span>
                        )}
                      </div>
                      <span>
                        <br />
                        <strong>שעת התור:</strong>
                        <br />
                        {appointmentDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        -
                        {appointmentDate
                          .toISOString()
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}
                      </span>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
        </div>

        <img src="assets/dog.png" alt="" />
      </div>
    </div>
  );
}
