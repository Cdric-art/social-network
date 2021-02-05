import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from './Utils.js';
import Card from './post/Card.jsx';

const FollowThread = () => {

	const [postFollow, setPostFollow] = useState([]);
	const posts = useSelector(state => state.allPostReducer);
	const userData = useSelector(state => state.userReducer);

	useEffect(() => {
		if (!isEmpty(userData) && !isEmpty(posts)) {
			let arr = [];
			userData.following.map(userId => {
				arr.push(posts.filter(post => post.posterId === userId));
				let result = [];
				for (let i = 0; i < arr.length; i++) {
					result = result.concat(arr[i]);
				}
				const sortResult = result.sort((a, b) => {
					return new Date(b.updatedAt) - new Date(a.updatedAt)
				})
				setPostFollow(sortResult);
			});
		}
	}, [userData, posts]);


	return (
		<div className="thread-container">
			<ul>
				{!isEmpty(postFollow) && postFollow.map(post => (
					<Card key={post._id} post={post}/>
				))}
			</ul>
		</div>
	);
};

export default FollowThread;