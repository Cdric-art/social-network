import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './Utils.js';
import { getTrends } from '../actions/post.action.js';
import { NavLink } from 'react-router-dom';

const Trends = () => {

	const posts = useSelector(state => state.allPostReducer);
	const usersData = useSelector(state => state.usersReducer);
	const trendList = useSelector(state => state.trendingReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!isEmpty(posts[0])) {
			const postsArray = Object.keys(posts).map(i => posts[i]);
			let sortedArray = postsArray.sort((a, b) => {
				return b.likers.length - a.likers.length;
			});
			sortedArray.length = 3;
			dispatch(getTrends(sortedArray));
		}
	}, [posts, dispatch]);

	return (
		<div className="trending-container">
			<h4>Trending</h4>
			<NavLink exact to="/trending">
				<ul>
					{trendList.length && trendList.map(post => (
						<li key={post._id}>
							<div>
								{usersData[0] && usersData.map(user => {
									if (user._id === post.posterId) {
										return <img key={user._id} src={user.picture} alt={user.picture}/>;
									} else return null;
								})
								}
							</div>
							<div className="trend-content">
								<p>{post.message}</p>
								<span>Lire</span>
							</div>
						</li>
					))}
				</ul>
			</NavLink>
		</div>
	);
};

export default Trends;