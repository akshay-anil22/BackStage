import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/api/dashboard");
        setUser(res.data.user);

        
        fetchAllEvents();
        fetchOrganizedEvents();
        fetchRegisteredEvents();
      } catch (err) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);


  const fetchAllEvents = async () => {
    try {
      const res = await API.get("/event");
      setAllEvents(res.data);
    } catch {
      setAllEvents([]);
    }
  };

  const fetchOrganizedEvents = async () => {
    try {
      const res = await API.get("/event/organized");
      setOrganizedEvents(res.data);
    } catch {
      setOrganizedEvents([]);
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const res = await API.get("/event/joined");
      setRegisteredEvents(res.data);
    } catch {
      setRegisteredEvents([]);
    }
  };

  const handlePromote = async () => {
    try {
      const res = await API.post("/api/promote");
      alert(res.data.message);
    } catch {
      alert("Failed to promote user. Try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>❌ {error || "Access denied. Please login."}</p>;

  const renderEvents = (events) => {
    if (!events || events.length === 0) return <p>No events available.</p>;
    //console.log("Event in dashboard:", events);


    return events.map((event) => (
      <div
        key={event._id}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>{event.title}</strong>
        <p>{event.description}</p>
        <small>{new Date(event.dateTime).toLocaleString()}</small>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
       <button onClick={() => navigate(`/event/${event.event_id}`)}>
            View Details
        </button>

      </div>
    ));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Welcome, {user.username} 🎉</h2>
      <p>User ID: {user._id}</p>
      <p>Email: {user.email}</p>

     
      <div style={{ margin: "20px 0" }}>
        <button onClick={() => navigate("/change-password")} style={{ marginRight: "10px" }}>
          Change Password
        </button>
        <button onClick={() => navigate("/create")} style={{ marginRight: "10px" }}>
          Create Event
        </button>
        <button onClick={handlePromote} style={{ marginRight: "10px" }}>
          Register as Organizer
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>

   
      <h3>All Events:</h3>
      {renderEvents(allEvents)}

      <h3>Your Organized Events:</h3>
      {renderEvents(organizedEvents)}

      <h3>Events You've Registered For:</h3>
      {renderEvents(registeredEvents)}
    </div>
  );
}

export default Dashboard;
