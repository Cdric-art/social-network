import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils.js';
import FollowHandler from './FollowHandler.jsx';

const FriendsHint = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [playOne, setPlayOne] = useState(true);
	const [friendsHint, setFriendsHint] = useState([]);
	const userData = useSelector(state => state.userReducer);
	const usersData = useSelector(state => state.usersReducer);

	useEffect(() => {
		const notFriendsList = () => {
			let array = [];
			usersData.map(user => {
				if (user._id !== userData._id && !user.followers.includes(userData._id)) {
					return array.push(user._id);
				}
			});
			array.sort(() => 0.5 - Math.random());
			if (window.innerHeight > 780) {
				array.length = 6;
			} else if (window.innerHeight > 720) {
				array.length = 4;
			} else if (window.innerHeight > 615) {
				array.length = 2;
			} else if (window.innerHeight > 540) {
				array.length = 1;
			} else {
				array.length = 0;
			}
			setFriendsHint(array);
		};

		if (playOne && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
			notFriendsList();
			setIsLoading(false);
			setPlayOne(false);
		}
	}, [userData, usersData]);

	return (
		<div className="get-friends-container">
			<h4>Suggestions</h4>
			{isLoading ? (
				<div className="icon">
					<i className="fas fa-spinner fa-pulse"/>
				</div>
			) : (
				<ul>
					{friendsHint.map(hint => {
						for (let i = 0; i < usersData.length; i++) {
							if (hint === usersData[i]._id) {
								return (
									<li className="user-hint" key={hint}>
										<img src={usersData[i].picture} alt={usersData[i].picture}/>
										<p>{usersData[i].pseudo}</p>
										<FollowHandler idToFollow={usersData[i]._id} type={'suggestion'}/>
									</li>
								);
							}
						}
					})}
				</ul>
			)}
		</div>
	);
};

export default FriendsHint;