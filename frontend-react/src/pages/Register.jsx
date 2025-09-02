import API from "../api/api";
import { useNavigate } from "react-router-dom";
import {React , useState} from "react";

function Register()
{
  const[formData,setFormData]=useState({
    username: "",
    email:"",
    password:"",
  });

  const[error,setError]=useState("");
  const navigate = useNavigate();

  const handleChange=(e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit= async (e) =>{
    e.preventDefault();
    setError("");

    try{
      await API.post("/api/register",formData);

      navigate("/login");
    }
    catch(err)
    {
       setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return(
     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <br />

        <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required

        />

         <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>

      </form>

        <p>
        Already have an account? <a href="/login">Login</a>
      </p>

      </div>
  );

}

export default Register;