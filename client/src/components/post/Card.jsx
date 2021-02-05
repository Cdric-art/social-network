import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils.js';
import FollowHandler from '../profil/FollowHandler.jsx';
import LikeButton from './LikeButton.jsx';
import { updatePost } from '../../actions/post.action.js';
import DeleteCard from './DeleteCard.jsx';
import CardComments from './CardComments.jsx';
import { NavLink } from 'react-router-dom';

const Card = ({post}) => {

	const [isLoading, setIsLoading] = useState(true);
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComments, setShowComments] = useState(false);
	const usersData = useSelector(state => state.usersReducer);
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	const updateItem = () => {
		if (textUpdate) {
			dispatch(updatePost(post._id, textUpdate));
		}
		setIsUpdated(false);
	};

	useEffect(() => {
		if (!isEmpty(usersData[0])) {
			setIsLoading(false);
		}
	}, [usersData]);

	return (
		<li className="card-container">
			{isLoading ? (
				<i className="fas fa-spinner fa-spin"/>
			) : (
				<>
					<div className="card-left">
						{!isEmpty(usersData[0]) && usersData.map(user => {
							if (user._id === post.posterId) {
								return (
									<NavLink key={user._id} exact to={`/public-profil/${user._id}`}>
										<img src={__dirname + user.picture} alt={user.picture}/>
									</NavLink>
								);
							} else return null;
						})}
					</div>
					<div className="card-right">
						<div className="card-header">
							<div className="pseudo">
								{!isEmpty(usersData[0]) && usersData.map(user => {
									if (user._id === post.posterId) {
										return (
											<>
												<h3 key={user._id}>{user.pseudo}</h3>
												{post.posterId !== userData._id && (
													<FollowHandler idToFollow={post.posterId} type={'card'}/>
												)}
											</>
										);
									} else return null;
								})}
							</div>
							<span>{dateParser(post.createdAt)}</span>
						</div>
						{!isUpdated && <p>{post.message}</p>}
						{isUpdated && (
							<div className="update-post">
								<textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)}/>
								<div className="button-container">
									<button className="btn" onClick={updateItem}>Valider modifications</button>
								</div>
							</div>
						)}
						{post.picture && (
							<img src={__dirname + post.picture} alt={post.picture} className="card-pic"/>
						)}
						{post.video && (
							<iframe width="500" height="300" src={post.video} frameBorder="0" title={post._id} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
						)}
						{userData._id === post.posterId && (
							<div className="button-container">
								<div onClick={() => setIsUpdated(!isUpdated)}>
									<img src={__dirname + './img/icons/edit.svg'} alt="edit"/>
								</div>
								<DeleteCard id={post._id}/>
							</div>
						)}
						<div className="card-footer">
							<LikeButton post={post}/>
							<div className="comment-icon">
								<img onClick={() => setShowComments(!showComments)} src={__dirname + './img/icons/message1.svg'} alt="comment"/>
								{post.comments && <span>{post.comments.length}</span>}
							</div>
						</div>
						{showComments && <CardComments post={post}/>}
					</div>
				</>
			)}
		</li>
	);
};

export default Card;