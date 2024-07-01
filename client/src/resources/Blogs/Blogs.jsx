import { useEffect, useState } from "react";
import axios from 'axios';
import './Blogs.css';

export const Blogs = () => {
    const [tblogs, setTblogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);


    useEffect(() => {
        const fetchTblogs = async () => {
            try {
                const response = await axios.get("https://tblog-v2-server.onrender.com/tblogs/");
                setTblogs(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTblogs();
    }, []);

    const openModal = (blog) => {
        setSelectedBlog(blog);
    };

    const closeModal = () => {
        setSelectedBlog(null);
    };
    return (
        <>
            <div className="blog">
                {tblogs.map((tblog, index) => (

                    <div className="blog-card" onClick={() => openModal(tblog)}>
                        <div className="feed-item" key={tblog.id}>
                        <p style={{color:"rgba(255, 170, 102, 1.00)"}}>{tblog.userName}</p>
                            <img src={tblog.imageUrl} alt={tblog.name} className="feed-image" />
                            
                            <h3 className="blog-name">{tblog.name}</h3>
                            <p className="blog-location" >@{tblog.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedBlog && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="modal-inner">
                        <p style={{color:"rgba(255, 170, 102, 1.00)"}}>{selectedBlog.userName}</p>
                            <img src={selectedBlog.imageUrl} alt={selectedBlog.name} />
                            <h3>{selectedBlog.name}</h3>
                            <p className="blog-location">{selectedBlog.location}</p>
                            <p>{selectedBlog.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
