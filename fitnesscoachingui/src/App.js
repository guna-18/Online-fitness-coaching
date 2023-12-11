import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CoachClients from "./components/Coach/CoachClients";
import CoachNavBar from "./components/Coach/CoachNavBar";
import CoachHomePage from "./pages/CoachHomePage";
import CoachAddExercises from "./pages/CoachAddExercises";
import Admin from "./components/admin/Admin";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [userID, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Check if userId is set in sessionStorage
    const storedUserId = sessionStorage.getItem("userId");
    const storedUserType = sessionStorage.getItem("usertype");

    if (storedUserId && storedUserType) {
      setUserId(storedUserId);
      setUserType(storedUserType);
    }
  }, []); // Run this effect only once on component mount

  const changeUserId = (id) => {
    setUserId(id);
  };

  const changeUserType = (type) => {
    setUserType(type);
  };

  return (
    <BrowserRouter>
      {userID && userType && (
        <>
          <CoachNavBar userType={userType} changeUserId={changeUserId} />
          <Routes>
            {userType === "Coach" && (
              <Route path="/coachHomepage" element={<CoachHomePage />} />
            )}
            {userType === "Coach" && (
              <Route
                path="/login"
                element={<Navigate to="/coachHomepage" replace />}
              />
            )}
            {userType === "Admin" && (
              <Route path="/admin" element={<Admin />} />
            )}
            <Route path="/clients" element={<CoachClients userId={userID} />} />
            <Route path="/clients/:clientId" element={<CoachAddExercises />} />
            {/* Add more routes for other user types if needed */}
          </Routes>
        </>
      )}

      {/* Common routes for both logged-in and non-logged-in users */}
      {!userID && (
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                changeUserId={changeUserId}
                changeUserType={changeUserType}
              />
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
