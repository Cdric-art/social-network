import React from 'react';
import Log from '../components/log/Log.jsx';
import {UidContext} from "../components/AppContext.jsx";
import {useContext} from "react";

const Profil = () => {

    const uid = useContext(UidContext);

    return (
        <div className="profil-page">
            {uid ? (
                <h1>UPDATE PAGE</h1>
            ) : (
                <div className="log-container">
                    <Log signIn={false} signUp={true} />
                    <div className="img-container">
                        <img src='./img/log.svg' alt="log"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;