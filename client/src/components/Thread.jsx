import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.action.js';
import { isEmpty } from './Utils.js';
import Card from './post/Card.jsx';

const Thread = () => {

	const [loadPost, setLoadPost] = useState(true);
	const [count, setCount] = useState(5);
	const dispatch = useDispatch();
	const posts = useSelector(state => state.postReducer);

	const loadMore = () => {
		if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
			setLoadPost(true);
		}
	};

	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts(count));
			setLoadPost(false);
			setCount(count + 5);
		}

		window.addEventListener('scroll', loadMore);
		return () => window.removeEventListener;

	}, [dispatch, loadPost, count]);

	return (
		<div className="thread-container">
			<ul>
				{ !isEmpty(posts[0]) && (
					posts.map(post => {
						return <Card key={post._id} post={post} />;
					})
				)}
			</ul>
		</div>
	);
};

export default Thread;