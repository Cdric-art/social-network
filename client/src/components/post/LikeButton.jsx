import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext.jsx';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.action.js';

const LikeButton = ({ post }) => {

	const [liked, setLiked] = useState(false);
	const uid = useContext(UidContext);
	const dispatch = useDispatch();

	useEffect(() => {
		if (post.likers.includes(uid)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [uid, liked, post.likers]);

	const like = () => {
		dispatch(likePost(post._id, uid));
		setLiked(true);
	};

	const unlike = () => {
		dispatch(unlikePost(post._id, uid));
		setLiked(false);
	};

	return (
		<div className="like-container">
			{uid === null && (
				<Popup
					trigger={<img src="./img/icons/heart.svg" alt="like"/>}
					position={['bottom center', 'bottom right', 'bottom left']}
					closeDocumentClick
				>
					<div style={{textAlign: 'center'}}>Connectez-vous pour liker un post !</div>
				</Popup>
			)}
			{uid && !liked && (
				<img onClick={like} src="./img/icons/heart.svg" alt="like"/>
			)}
			{uid && liked && (
				<img onClick={unlike} src="./img/icons/heart-filled.svg" alt="like"/>
			)}
			<span>{post.likers && post.likers.length}</span>
		</div>
	);
};

export default LikeButton;