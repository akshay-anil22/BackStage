import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function CreateEvent() {

    const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    category: "",
    paid: false,
    notes: "",
    budget: "",
  });

  const[error,setError]=useState("");
  const[message,setMessage]=useState("");
  const navigate= useNavigate();

const handleChange = (e) => {
  const { name, type, value, checked } = e.target;
  setFormData((prev) => ({
    ...prev, 
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setMessage("");
    setError("");

    try
    {
      console.log("Token before sending:", localStorage.getItem("token"));
      console.log("API base URL:", API.defaults.baseURL);

      //console.log("Token before request:", localStorage.getItem("token"));
      //const res = await API.post("http://localhost:5000/event/create", formData);


      const res= await API.post("/event/create",{
        ...formData, budget: formData.budget ? parseFloat(formData.budget) : 0,
      })

      
      setMessage(res.data.message || "Event created successfully ✅");
      setFormData({
        title: "",
        description: "",
        dateTime: "",
        location: "",
        category: "",
        paid: false,
        notes: "",
        budget: 0,
      });

       navigate("/dashboard");

    }
    catch(err){
       setError(err.response?.data?.message || "Something went wrong ❌");
    }

  };

return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Create New Event</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title:</label><br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Description:</label><br />
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Date & Time:</label><br />
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Location:</label><br />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Category:</label><br />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Conference">Conference</option>
          <option value="Webinar">Webinar</option>
        </select><br /><br />

        <label>
          <input
            type="checkbox"
            name="paid"
            checked={formData.paid}
            onChange={handleChange}
          />
          Is this a paid event?
        </label><br /><br />

        <label>Notes (optional):</label><br />
        <textarea
          name="notes"
          rows="2"
          value={formData.notes}
          onChange={handleChange}
        /><br /><br />

        <label>Budget (₹):</label><br />
        <input
          type="number"
          name="budget"
          min="0"
          value={formData.budget}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );

}

export default CreateEvent;