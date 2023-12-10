import './App.css';
import CoachClients from './components/Coach/CoachClients';
import CoachNavBar from './components/Coach/CoachNavBar';
import CoachHomePage from './pages/CoachHomePage';
import CoachAddExercises from './pages/CoachAddExercises';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import {useState} from 'react';


function App() {
  const [userID,setUserId] = useState(null);
  const [userType,setUserType] = useState(null);
  const changeUserId = (id)=>{
    setUserId(id);
  }
  const changeUserType = (type) => {
    setUserType(type);
  } 
  return (
<BrowserRouter>

<CoachNavBar userType={userType}/>
      <Routes>
      <Route path="/" element={<LoginPage changeUserId={changeUserId} changeUserType={changeUserType}/>}/>
        <Route path="/coachHomepage" element={<CoachHomePage/>}/>
        <Route path="/clients" element={<CoachClients userId={userID}/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route
  path="/clients/:clientId"
  element={<CoachAddExercises />}
/>
<Route path="/register" element={<RegistrationPage/>}/>
<Route path="/login" element={<LoginPage changeUserId={changeUserId} changeUserType={changeUserType}/>}/>
       
      </Routes>
</BrowserRouter>
  );
}

export default App;
