import './App.css';
import CoachClients from './components/Coach/CoachClients';
import CoachNavBar from './components/Coach/CoachNavBar';
import CoachHomePage from './pages/CoachHomePage';
import CoachAddExercises from './pages/CoachAddExercises';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";

function App() {
  return (
<BrowserRouter>

<CoachNavBar/>
      <Routes>
        <Route path="/" element={<CoachHomePage/>}/>
        <Route path="/clients" element={<CoachClients/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route
  path="/clients/:clientId"
  element={<CoachAddExercises />}
/>
       
      </Routes>
</BrowserRouter>
  );
}

export default App;
