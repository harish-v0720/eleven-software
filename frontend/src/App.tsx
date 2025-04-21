// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CourseTypes from "./components/CourseTypes"
import Course from "./components/Courses";
import CourseOfferings from "./components/CourseOfferings";
import RegistrationsPage from "./components/RegistrationsPage";

const App= () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CourseTypes />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/offerings" element={<CourseOfferings />} />
          <Route path="/registrations" element={<RegistrationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
