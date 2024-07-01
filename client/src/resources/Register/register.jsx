import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from "react-router-dom";
import './register.css'
export const Register = () => {
    const [username,setuserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [city,setCity] = useState("")
    const navigate = new useNavigate();
    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("https://tblog-v2-server.onrender.com/auth/register", {
          username,
          email,
          password,
          city,
        });
        if (response.data.message === "User Registered Successfully") {
          alert("Registration Completed! Do Login!");
          navigate("/login")
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    


    return (
        <>
        <div className="container">
          <p style={{ fontSize: '27px', textAlign: 'center' }}>Register</p>
          <form onSubmit={onSubmit}>
            <input type="text" id="name" placeholder="Name" onChange={(event) => setuserName(event.target.value)} required />
            <input type="email" id="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} required />
            <input type="password" id="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} required />
            <input type="text" id="city" placeholder="City" onChange={(event) => setCity(event.target.value)} required />
            <button style={{ color: 'black', backgroundColor: 'rgb(241, 130, 56)' }} type="submit">Register</button>
          </form>
          <p className="reg-already"style={{ paddingTop: '10px', textAlign:'center'}}>Already have an account? <Link to="/login" style={{textDecoration:'none',color:'orangered'}}>Sign In</Link></p>
        </div>
        </>
      );
}