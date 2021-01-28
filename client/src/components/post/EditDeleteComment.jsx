import React from 'react';
import { useState } from "react";
import { UidContext } from "../AppContext.jsx";
import { useContext } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.action.js";

const EditDeleteComment = ({ comment, postId}) => {

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editComment(postId, comment._id, text))
            setText('')
            setEdit(false)
        }
    }
    
    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id))
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true)
            }
        }
        checkAuthor()
    }, [uid, comment.commenterId])

    return (
        <div className="edit-comment">
            {isAuthor && !edit && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit"/>
                </span>
            )}
            {isAuthor && edit && (
                <form className="edit-comment-form" onSubmit={handleEdit}>
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                    <br/>
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text}/>
                    <br/>
                    <div className="btn">
                        <span onClick={() => {
                            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                                handleDelete()
                            }
                        }}>
                            <img src="./img/icons/trash.svg" alt="trash"/>
                        </span>
                        <input type="submit" value="Valider les modifications" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;