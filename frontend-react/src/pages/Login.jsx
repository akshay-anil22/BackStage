import API from "../api/api";
import { useNavigate } from "react-router-dom";
import {React , useState} from "react";

function Login()
{
  const[formData,setFormData]=useState({
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
      const res= await API.post("/api/login",formData);
      localStorage.setItem("token",res.data.token);


      navigate("/dashboard");
    }
    catch(err)
    {
       setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return(
     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        
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
        <button type="submit">Login</button>

      </form>

        <p>
        Don't have an account? <a href="/api">Register</a>
      </p>

      </div>
  );

}

export default Login;