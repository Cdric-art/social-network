import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isEmpty, timestampParser } from "../Utils.js";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.action.js";

const NewPost = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState('');

    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch()

    const handlePost = async () => {
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('posterId', userData._id)
            data.append('message', message)
            if (file) {
                data.append('file', file)
            }
            data.append('video', video)

            await dispatch(addPost(data))
            dispatch(getPosts())

            cancelPost()

        } else {
            alert('Veuillez entrer un message')
        }
    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setVideo('')
    }

    const handleVideo = () => {
        let findLink = message.split(" ")
        for (let i = 0; i < findLink.length; i++) {
            if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
                let embed = findLink[i].replace('watch?v=', 'embed/')
                setVideo(embed.split('&')[0])
                findLink.splice(i, 1)
                setMessage(findLink.join(' '))
                setPostPicture(null)
            }
        }
    }

    const cancelPost = () => {
        setMessage('')
        setPostPicture('')
        setVideo('')
        setFile('')
    }

    useEffect(() => {
        if (!isEmpty(userData)) {
            setIsLoading(false)
        }
        handleVideo()
    }, [userData, message, video])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse" />
            ) : (
                <>
                     <div className="data">
                        <p>
                            <span>{userData.following ? userData.following.length : 0}</span>
                            &nbsp;Abonnement{userData.following && userData.following.length > 1 ? 's' : null }
                        </p>
                         <p>
                             <span>{userData.followers ? userData.followers.length : 0}</span>
                             &nbsp;Abonné{userData.followers && userData.followers.length > 1 ? 's' : null }
                         </p>
                     </div>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="profil"/>
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea name="message" id="message" placeholder="Quoi de neuf ?" value={message} onChange={(e) => setMessage(e.target.value)} />
                        {message || postPicture || video.length > 10 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.picture} alt="pic"/>
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        {postPicture && (
                                            <img src={postPicture} alt="post-img"/>
                                        )}
                                        {video && (
                                            <iframe title={video} src={video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypte-media; gyroscope; picture-in-picture" allowFullScreen />
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null }
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="pic" />
                                        <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" onChange={handlePicture}/>
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo('')}>Supprimer video</button>
                                )}
                            </div>
                            <div className="btn-send">
                                {message || postPicture || video.length > 5 ? (
                                    <button className="cancel" onClick={cancelPost}>Annuler message</button>
                                    ) : null }
                                <button className="send" onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPost;