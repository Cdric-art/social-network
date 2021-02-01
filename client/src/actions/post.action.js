import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const GET_ALL_POST = 'GET_ALL_POST';
export const ADD_POST = 'ADD_POST';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const GET_TRENDS = 'GET_TRENDS';

export const GET_POST_ERRORS = 'GET_POST_ERRORS';

export const getPosts = (count) => {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/post`
		})
			.then(res => {
				const dataLimit = res.data.slice(0, count);
				dispatch({type: GET_POSTS, payload: dataLimit});
				dispatch({type: GET_ALL_POST, payload: res.data});
			})
			.catch(err => console.log({err}));
	};
};

export const addPost = (data) => {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/post`,
			data: data
		})
			.then(res => {
				if (res.data.errors) {
					dispatch({type: GET_POST_ERRORS, payload: res.data.errors});
				} else {
					dispatch({type: GET_POST_ERRORS, payload: ''});
				}
			})
			.catch(err => console.log({err}));
	};
};

export const likePost = (postId, userId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`,
			data: {id: userId}
		})
			.then(() => {
				dispatch({type: LIKE_POST, payload: {postId, userId}});
			})
			.catch(err => console.log({err}));
	};
};

export const unlikePost = (postId, userId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`,
			data: {id: userId}
		})
			.then(() => {
				dispatch({type: UNLIKE_POST, payload: {postId, userId}});
			})
			.catch(err => console.log({err}));
	};
};

export const updatePost = (postId, message) => {
	return (dispatch) => {
		return axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
			data: {message}
		})
			.then(() => {
				dispatch({type: UPDATE_POST, payload: {message, postId}});
			})
			.catch(err => console.log({err}));
	};
};

export const deletePost = (postId) => {
	return (dispatch) => {
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
		})
			.then(() => {
				dispatch({type: DELETE_POST, payload: {postId}});
			})
			.catch(err => console.log({err}));
	};
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
			data: {
				commenterId,
				text,
				commenterPseudo
			}
		})
			.then(() => {
				dispatch({type: ADD_COMMENT, payload: {postId}});
			})
			.catch(err => console.log({err}));
	};
};

export const editComment = (postId, commentId, text) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
			data: {
				commentId,
				text
			}
		})
			.then(() => {
				dispatch({type: EDIT_COMMENT, payload: {postId, commentId, text}});
			})
			.catch(err => console.log({err}));
	};
};

export const deleteComment = (postId, commentId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
			data: {commentId}
		})
			.then(() => {
				dispatch({type: DELETE_COMMENT, payload: {postId, commentId}});
			})
			.catch(err => console.log({err}));
	};
};

export const getTrends = (sortedArray) => {
	return (dispatch) => {
		dispatch({type: GET_TRENDS, payload: sortedArray});
	};
};