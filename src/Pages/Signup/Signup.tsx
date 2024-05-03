import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";
import { User } from "../../Models/User";
import { createContact, postLogin } from "../../Services/UserService.ts";
export default function Signup() {
  const [userData, setUserData] = useState<User>({
    userName: "",
    password: "",
    firstName: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createContact(userData);
      console.log("Response:", response);
      if (response.userId != undefined) {
        try {
          const login = await postLogin(userData);
          if (login.token != undefined) {
            localStorage.setItem("token", login.token);
            window.location.href = "/dashboard";
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-page">
      <h1>הרשמה</h1>
      <div className="signup-bottom">
        <div className="signup-card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="שם משתמש"
              value={userData.userName}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="סיסמא"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="שם פרטי"
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              required
            />
            <input type="submit" value="הירשם בחינם" />
          </form>
          <Link to="/login" className="login">
            יש לך משתמש התחבר עכשיו
          </Link>
        </div>
        <img src="assets/dog.png" alt="Dog" />
      </div>
    </div>
  );
}
