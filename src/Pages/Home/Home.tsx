import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-page">
      <div className="content">
        <h1>Dog Care</h1>
        <h2>מערכת לקביעת תורים למספרת כלבים</h2>
        <Link to="/signup" className="signup button">
          הרשמה
        </Link>
        <Link to="/login" className="login button">
          התחבר
        </Link>
      </div>
        <img src="assets/dog.png" alt="Dog" />
    </div>
  );
}
