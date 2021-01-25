import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.action.js";
import { isEmpty } from "./Utils.js";
import Card from "./post/Card.jsx";

const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.postReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [dispatch, loadPost])

    return (
        <div className="thread-container">
            <ul>
                { !isEmpty(posts[0]) && (
                    posts.map(post => {
                        return <Card key={post._id} post={post} />
                    })
                )}
            </ul>
        </div>
    );
};

export default Thread;