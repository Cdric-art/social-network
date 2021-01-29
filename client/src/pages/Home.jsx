import React from 'react';
import LeftNav from "../components/LeftNav.jsx";
import Thread from "../components/Thread.jsx";
import { UidContext } from "../components/AppContext.jsx";
import { useContext } from "react";
import NewPost from "../components/post/NewPost.jsx";
import Log from "../components/log/Log.jsx";

const Home = () => {

    const uid = useContext(UidContext);

    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {uid ? <NewPost /> : <Log signIn={true} signUp={false} />}
                </div>
                <Thread />
            </div>
        </div>
    );
};

export default Home;