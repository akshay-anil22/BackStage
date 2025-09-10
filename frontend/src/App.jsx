  import { BrowserRouter as  Router, Routes, Route} from "react-router-dom";

  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Dashboard from "./pages/Dashboard";
  import CreateEvent from "./pages/CreateEvent";
  import EventDetails from "./pages/EventDetails";
  import Onboarding from "./pages/Onboarding";

  import ChangePassword from "./pages/changePassword";

  function App() {
    return (
      <Router>
        <Routes>

        <Route path="/" element={<Onboarding />} />
          {<Route path="/register" element={<Register/>} /> }

          { < Route path="/login" element={<Login/>}  /> }
          { <Route path="/dashboard" element={<Dashboard />} /> }
          { <Route path="/event/:id" element={<EventDetails />} /> }
          { <Route path="/create" element={<CreateEvent />} /> }
          { <Route path="/change-password" element={<ChangePassword />} /> }
          
        </Routes>
      </Router>
    )
  }

  export default App;