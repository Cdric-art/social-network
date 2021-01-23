import React, { useState, useEffect }  from 'react';
import Routes from './components/routes';
import {UidContext} from "./components/AppContext.jsx";
import axios from "axios";

const App = () => {

    const [uid, setuid] = useState(null);

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
    }, [uid]);

    return (
        <UidContext.Provider value={uid}>
            <Routes/>
        </UidContext.Provider>
    );
};

export default App;
