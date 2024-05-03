import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { User } from "../../Models/User";
import { postLogin } from "../../Services/UserService.ts";

export default function Login() {
  const [userData, setUserData] = useState<User>({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const login = await postLogin(userData);
      if (login.token != undefined) {
        localStorage.setItem("token", login.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="login-page">
      <h1>התחבר</h1>
      <div className="login-bottom">
        <div className="login-card">
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
          <div className="error">{error}</div>
            <input type="submit" value="התחבר" />
          </form>
          <Link to="/signup" className="signup">
            אין לך משתמש הירשם בחינם
          </Link>
        </div>
        <img src="assets/dog.png" alt="" />
      </div>
    </div>
  );
}
