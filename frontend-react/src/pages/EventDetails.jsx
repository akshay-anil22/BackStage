import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function EventDetails() {
  const { id: eventId } = useParams(); 
  
console.log("Event ID from URL:", eventId);
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const userRes = await API.get("/api/dashboard");
        setCurrentUser(userRes.data.user);

        const res = await API.get(`/event/${eventId}`);
        setEvent(res.data);

        const joined = res.data.students.some(
          (s) => s._id === userRes.data.user._id
        );
        setAlreadyJoined(joined);
      } catch (err) {
        setMessage("❌ Error loading event.");
      }
    };
    fetchData();
  }, [eventId]);

  const handleJoin = async () => {
    try {
      const res = await API.get(`/event/join/${eventId}`);
      setMessage(res.data.message);
      setAlreadyJoined(true);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/event/${eventId}`);
      alert("✅ Event deleted.");
      navigate("/dashboard");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || err.message));
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>{event.title}</h2>
      <p>📝 {event.description}</p>
      <p>📅 {new Date(event.dateTime).toLocaleString()}</p>
      <p>📍 {event.location}</p>
      <p>📚 {event.category}</p>
      <p>👤 Organizer: {event.organizer.username}</p>
      <p>
        👥 Participants:{" "}
        {event.students.length > 0
          ? event.students.map((s) => s.username).join(", ")
          : "None"}
      </p>

      {alreadyJoined ? (
        <button disabled>✅ Already Joined</button>
      ) : (
        <button onClick={handleJoin}>Join Event</button>
      )}

      {currentUser?.role === "organizer" &&
        event.organizer._id === currentUser._id && (
          <button
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
          >
            Delete Event
          </button>
        )}

      {message && <p>{message}</p>}
      <Link to="/dashboard">← Back to Events</Link>
    </div>
  );
}

export default EventDetails;
