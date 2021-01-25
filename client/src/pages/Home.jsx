import React from 'react';
import LeftNav from "../components/LeftNav.jsx";
import Thread from "../components/Thread.jsx";

const Home = () => {
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Thread />
            </div>
        </div>
    );
};

export default Home;