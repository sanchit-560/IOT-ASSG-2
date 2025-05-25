import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "../pages/homepage";
import { ReservationPage } from "../pages/reservationpage";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/bookingPage" element={<ReservationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
