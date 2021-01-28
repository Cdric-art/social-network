import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { isEmpty, timestampParser } from "../Utils.js";
import FollowHandler from "../profil/FollowHandler.jsx";
import { addComment, getPosts } from "../../actions/post.action.js";
import EditDeleteComment from "./EditDeleteComment.jsx";

const CardComments = ({ post }) => {

    const [text, setText] = useState('');
    const usersData = useSelector(state => state.usersReducer);
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    
    const handleComment = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''))
                .catch(err => console.log({ err }))
        }
    }

    return (
        <div className="comments-container">
            {post.comments.map(comment => (
                <div key={comment._id} className={comment.commenterId === userData._id ? "comment-container client" : "comment-container"}>
                    <div className="left-part">
                        {!isEmpty(usersData[0]) && usersData.map(user => {
                            if (user._id === comment.commenterId) {
                                return <img key={comment.commenterId} src={user.picture} alt={comment.commenterId} />
                            } else return null
                        })}
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <div className="pseudo">
                                <h3>{comment.commenterPseudo}</h3>
                                {comment.commenterId !== userData._id && (
                                    <FollowHandler idToFollow={comment.commenterId} type={"card"} />
                                )}
                            </div>
                            <span>{timestampParser(comment.timestamp)}</span>
                        </div>
                        <p>{comment.text}</p>
                        <EditDeleteComment comment={comment} postId={post._id}/>
                    </div>
                </div>
            ))}
            {userData._id && (
                <form onSubmit={handleComment} className="comment-form">
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Laisser un commentaire"/>
                    <br/>
                    <input type="submit" value="Envoyer" />
                </form>
            )}
        </div>
    );
};

export default CardComments;