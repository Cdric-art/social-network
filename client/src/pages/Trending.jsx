import React, { useContext } from 'react';
import { UidContext } from "../components/AppContext.jsx";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav.jsx";
import { isEmpty } from "../components/Utils.js";
import Card from "../components/post/Card.jsx";
import Trends from "../components/Trends.jsx";

const Trending = () => {

    const uid = useContext(UidContext);
    const trendList = useSelector(state => state.trendingReducer);

    return (
        <div className="trending-page">
            <LeftNav/>
            <div className="main">
                <ul>
                    {!isEmpty(trendList[0]) && trendList.map(post => (
                        <Card post={post} key={post._id}/>
                    ))}
                </ul>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                </div>
            </div>
        </div>
    );
};

export default Trending;