import './App.css';
import CoachClients from './components/Coach/CoachClients';
import CoachNavBar from './components/Coach/CoachNavBar';
import CoachHomePage from './pages/CoachHomePage';
import CoachAddExercises from './pages/CoachAddExercises';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
<BrowserRouter>
<CoachNavBar/>
      <Routes>
        <Route path="/" element={<CoachHomePage/>}/>
        <Route path="/clients" element={<CoachClients/>}/>
        <Route
  path="/clients/:clientId"
  element={<CoachAddExercises />}
/>
<Route path="/register" element={<RegistrationPage/>}/>
<Route path="/login" element={<LoginPage/>}/>
       
      </Routes>
</BrowserRouter>
  );
}

export default App;
