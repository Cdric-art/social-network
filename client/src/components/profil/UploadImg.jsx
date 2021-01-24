import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions.js";

const UploadImg = () => {

    const [file, setFile] = useState('');
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer)

    const handlePicture = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('pseudo', userData.pseudo);
        data.append('userId', userData._id);
        data.append('file', file);

        dispatch(uploadPicture(data, userData._id))
    }

    return (
        <form onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'image</label>
            <input onChange={(e) => setFile(e.target.files[0])} type="file" id="file" name="file" accept=".jpeg, .jpg, .png"/>
            <br/>
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default UploadImg;