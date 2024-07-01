
import React, { useState } from 'react';
import './addpost.css';
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom"

export function Addpost() {
  const userID = useGetUserID();
  const userName = window.localStorage.getItem("userName")
  const [tblog, setTblog] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: '',
    userOwner: userID,
    userName : userName
  });

  const navigate = new useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTblog({ ...tblog, [name]: value });
  };

  const handle = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/tblogs/', tblog);
      alert('Blog Created');
      navigate("/blogs")
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className='add-container'>
        <form onSubmit={handle}>
        <h1>Create Post</h1>
          <div>
            {/* <label htmlFor='CreatePost-title'>Title</label> */}
            <input
              type='text'
              id='CreatePost-title'
              name='name'
              placeholder='Title'
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor='CreatePost-description'>Description</label> */}
            <textarea
              id='CreatePost-description'
              name='description'
              placeholder='Description'
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            {/* <label htmlFor='CreatePost-location'>Location</label> */}
            <input
              type='text'
              id='CreatePost-location'
              name='location'
              placeholder='Location'
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='CreatePost-image'
              name='imageUrl'
              placeholder='Upload Image'
              onChange={handleChange}
            />
          </div>
          <button type='submit'>Create Post</button>
        </form>
      </div>
  );
}