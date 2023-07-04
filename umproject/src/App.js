import Login from "./Login";
import ReactTabs from "./ReactTabs";
import "./App.css";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}
