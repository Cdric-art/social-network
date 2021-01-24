import React, { useState, useEffect }  from 'react';
import Routes from './components/routes';
import {UidContext} from "./components/AppContext.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions.js";

const App = () => {

    const [uid, setuid] = useState(null);
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchToken = async () => {
            await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true
            })
                .then(res => setuid(res.data))
                .catch(err => console.log(err))
        }
        fetchToken()
            .then(() => console.log({uid}))
            .catch(err => console.log(err))

        if (uid) {
            dispatch(getUser(uid))
        }
    }, [uid, dispatch]);

    return (
        <UidContext.Provider value={uid}>
            <Routes/>
        </UidContext.Provider>
    );
};

export default App;
