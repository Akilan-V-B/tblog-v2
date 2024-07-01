import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import {useCookies} from 'react-cookie'
import './navbar.css'
import { useEffect, useState } from "react";

export const Navbar = () => {
    const [cookies, setCookies] =useCookies(["access_token"]);
    const [image,setimage]=useState("image/ho.jpg");
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token","");
        // document.body.style.backgroundImage = "url('images/ho.jpg')";
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("userName");
        navigate("/");
    }
    useEffect(() => {
        const topNavElement = document.querySelector('.top-nav');
    
        if (topNavElement) {
            if (cookies.access_token) {
                document.body.style.backgroundImage = "none";
                topNavElement.style.backgroundColor = "rgba(255, 170, 102, 1.00)";// Blue color
                topNavElement.style.border = "10px solid rgba(255, 170, 102, 1.00)";
            } else {
                document.body.style.backgroundImage = "url('images/ho.jpg')";
                topNavElement.style.backgroundColor = "transparent"; // Reset background color
                topNavElement.style.border = "10px solid transparent"; // Reset border
            }
        }
    }, [cookies.access_token]);
    return (
        <>
                <div className="top-nav">
                    <ul className="inner-top">
                        <li >
                            <div className="nav-logo"><li><img id="logo" src={logo} alt="logo" /></li></div>
                            
                        </li>
                        {!cookies.access_token ? (<li style={{fontSize:'20px'}}><Link to="/">Home</Link></li>):null}
                        {!cookies.access_token ? (<li style={{fontSize:'20px'}}><Link to="/register">Register</Link></li>):null}
                        {!cookies.access_token ? (<li style={{fontSize:'20px'}}><Link to="/login">Sign In</Link></li>):null}
                        {cookies.access_token ? (<li style={{fontSize:'20px'}}><Link to="/blogs">Blogs</Link></li>):null}
                        {cookies.access_token ? (<li style={{fontSize:'20px'}}><Link to="/addpost">Add Post</Link></li>):null}
                        {cookies.access_token ? (<li style={{fontSize:'20px'}}><Link to="/profile">Profile</Link></li>):null}
                        {cookies.access_token ? (<li style={{fontSize:'20px'}}><a  onClick={logout}>Logout</a></li>):null}
                        {!cookies.access_token ? (<li style={{fontSize:'20px'}}><Link to="/aboutus">About Us</Link></li>):null}
                        
                    </ul>
        
                </div>

        </>
    )
}