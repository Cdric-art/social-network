import React from 'react';
import LeftNav from "../LeftNav.jsx";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg.jsx";
import { useState } from "react";
import { updateBio } from "../../actions/user.actions.js";
import { dateParser } from "../Utils.js";
import FollowHandler from "./FollowHandler.jsx";

const UpdateProfil = () => {

    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector(state => state.userReducer);
    const usersData = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();

    const [followingPopUp, setFollowingPopUp] = useState(false);
    const [followersPopUp, setFollowersPopUp] = useState(false);

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false)
    }

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user img"/>
                    <UploadImg />
                    {/*<p>{errros.maxSize}</p>*/}
                    {/*<p>{errros.format}</p>*/}
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {!updateForm && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea onChange={(e) => setBio(e.target.value)} defaultValue={userData.bio} />
                                <button onClick={handleUpdate}>Valider modifications</button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopUp(true)}>
                        Abonnements : {userData.following ? userData.following.length : null}
                    </h5>
                    <h5 onClick={() => setFollowersPopUp(true)}>
                        Abonnés : {userData.followers ? userData.followers.length : null}
                    </h5>
                </div>
            </div>
            {followingPopUp && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span onClick={() => setFollowingPopUp(false)} className="cross">&#10005;</span>
                        <ul>
                            {usersData.map(user => {
                                for (let i = 0; i < userData.following.length; i++) {
                                    if (user._id === userData.following[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic"/>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} />
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopUp && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span onClick={() => setFollowersPopUp(false)} className="cross">&#10005;</span>
                        <ul>
                            {usersData.map(user => {
                                for (let i = 0; i < userData.followers.length; i++) {
                                    if (user._id === userData.followers[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic"/>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} />
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfil;