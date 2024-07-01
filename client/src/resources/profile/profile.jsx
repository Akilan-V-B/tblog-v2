import './profile.css'
import { useEffect, useState } from "react"
import { useGetUserID } from "../hooks/useGetUserID";
import axios from 'axios'
export const Profile = () => {
    const [tblogs, setTblogs] = useState([]);
    const [user, setUser] = useState('');
    const [selectedBlog, setSelectedBlog] = useState(null);
    const userID = useGetUserID();
    const fetchTblog = async () => {
        try {
            const response = await axios.post("https://tblog-v2-server.onrender.com/tblogs/yourblogs", { userOwner: userID })
            setTblogs(response.data);
        } catch (err) {
            console.error(err);
        }
    }
    const fetchUser = async () => {
        try {
            const response = await axios.post("https://tblog-v2-server.onrender.com/auth/details", { _id: userID })
            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchUser();
        fetchTblog();
    }, []);

    const openModal = (blog) => {
        setSelectedBlog(blog);
    };

    const closeModal = () => {
        setSelectedBlog(null);
    };
    const deleteBlog = async (id) => {
    try {
        console.log(id);
        const response = await axios.post(`https://tblog-v2-server.onrender.com/tblogs/deleteblog`,{blogId : id});
        await fetchTblog();
        alert(response.data.message);
    } catch (err) {
        console.error(err);
    }
};

    return (
        <>
            <div className='profile'>
                <h1 style={{ textAlign: "center", marginTop: "20px", padding: "20px" }}>User Profile</h1>
                <div className="profile-container">
                    <div className="detail">
                        <label>Username:</label>
                        <span>{user.username}</span>
                    </div>
                    <div className="detail">
                        <label>Email:</label>
                        <span>{user.email}</span>
                    </div>
                    <div className="detail">
                        <label>City:</label>
                        <span>{user.city}</span>
                    </div>
                </div>
                <h1 style={{ textAlign: "center", marginTop: "20px", padding: "20px" }}>Blogs posted</h1>
                <div className="blog">
                    {tblogs.map((tblog, index) => (

                        <div className="profile-card">
                            <div key={tblog._id}>
                                <img src={tblog.imageUrl} alt={tblog.name} className="feed-image" onClick={() => openModal(tblog)}/>
                                {/* <p>Fayaz</p> */}
                                <h3 className="profile-name" onClick={() => openModal(tblog)}>{tblog.name}</h3>
                                <p className="profile-location" onClick={() => openModal(tblog)}>{tblog.location}</p>
                                <div className="profile-des" onClick={() => openModal(tblog)}>{tblog.description}</div>
                                <div className='edit-butt'>
                                    <button className="edit-delete-buttons" onClick={() => deleteBlog(tblog._id)}>Delete Blog</button></div>
                            </div>
                        </div>

                    ))}
                </div>
                {selectedBlog && (
                    <div className="profile-modal" onClick={closeModal}>
                        <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="close-btn" onClick={closeModal}>
                                &times;
                            </span>
                            <div className="modal-inner">

                                <img src={selectedBlog.imageUrl} alt={selectedBlog.name} />
                                <p>Fayaz</p>
                                <h3>{selectedBlog.name}</h3>
                                <p className="blog-location">{selectedBlog.location}</p>
                                <p>{selectedBlog.description}</p>
                            </div>
                        </div>
                    </div>
                )}


            </div>


        </>
    )
}