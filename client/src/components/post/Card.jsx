import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isEmpty } from "../Utils.js";

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
                                    <img key={user._id} src={user.picture} alt="user-picture" />
                                )
                            }
                        })}
                    </div>
                    <div className="card-night">

                    </div>
                </>
            )}
        </li>
    );
};

export default Card;