import API from "../api/api";
import { useNavigate } from "react-router-dom";
import {React , useState} from "react";

function ChangePassword()
{
  const[formData,setFormData]=useState({
    oldPassword:"",
    newPassword:"",
  });

  const[error,setError]=useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange=(e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit= async (e) =>{
    e.preventDefault();
    setError("");

    try{
      const res= await API.post("/api/change-password",formData);
      
      setMessage(res.data.message);
      setFormData({ oldPassword: "", newPassword: "" });

    
      localStorage.removeItem("token");
      navigate("/login");


    }
    catch(err)
    {
       setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return(
     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Change Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        
       
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        />
        <br />

        
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Change Password</button>

      </form>



      </div>
  );

}

export default ChangePassword;