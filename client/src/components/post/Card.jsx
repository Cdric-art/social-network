import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { dateParser, isEmpty } from "../Utils.js";
import FollowHandler from "../profil/FollowHandler.jsx";
import LikeButton from "./LikeButton.jsx";

const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector(state => state.usersReducer);
    const userData = useSelector(state => state.userReducer);

    useEffect(() => {
        if (!isEmpty(usersData[0])) {
            setIsLoading(false)
        }
    }, [usersData])

    return (
        <li className="card-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-spin" />
            ) : (
                <>
                    <div className="card-left">
                        {!isEmpty(usersData[0]) && usersData.map(user => {
                            if (user._id === post.posterId) {
                                return (
                                    <img key={user._id} src={user.picture} alt={user.picture} />
                                )
                            } else return null
                        })}
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                {!isEmpty(usersData[0]) && usersData.map(user => {
                                    if (user._id === post.posterId) {
                                        return (
                                            <>
                                                <h3 key={user._id}>{user.pseudo}</h3>
                                                {post.posterId !== userData._id && (
                                                    <FollowHandler idToFollow={post.posterId} type={'card'}/>
                                                )}
                                            </>
                                        )
                                    } else return null
                                })}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && (
                            <img src={post.picture} alt={post.picture} className="card-pic" />
                            )}
                        {post.video && (
                            <iframe width="500" height="300" src={post.video} frameBorder="0" title={post._id} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        )}
                        <div className="card-footer">
                            <LikeButton post={post} />
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="comment"/>
                                {post.comments && <span>{post.comments.length}</span>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;