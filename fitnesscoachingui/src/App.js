import "./App.css";
import CoachClients from "./components/Coach/CoachClients";
import CoachNavBar from "./components/Coach/CoachNavBar";
import CoachHomePage from "./pages/CoachHomePage";
import CoachAddExercises from "./pages/CoachAddExercises";
import BasicUserAddExercises from "./pages/BasicUserAddExercises";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import EliteUserAddExercises from "./pages/EliteUserAddExercises";

function App() {
  const [userID, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

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

          {userType === 'Coach' && <Route path="/coachHomepage" element={<CoachHomePage />} />}
            {userType === 'Coach' && (
              <Route
                path="/login"
                element={<Navigate to="/coachHomepage" replace />}
              />
            )}
            {userType === 'Admin' && <Route path="/admin" element={<Admin />} />}
            <Route path="/clients" element={<CoachClients userId={userID} />} />
            <Route path="/clients/:clientId" element={<CoachAddExercises />} />
            {/* Add more routes for other user types if needed */}
             <Route path="/home/basicUser/:user_id"
          element={<BasicUserAddExercises />}
        />

        {/* Add the new route for EliteUserAddExercises */}
        <Route
          path="/home/eliteUser/:user_id"
          element={<EliteUserAddExercises />}
        />
          </Routes>
        </>
      )}

      {/* Common routes for both logged-in and non-logged-in users */}
      {!userID && (
        <Routes>
          <Route path="/login" element={<LoginPage changeUserId={changeUserId} changeUserType={changeUserType} />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
