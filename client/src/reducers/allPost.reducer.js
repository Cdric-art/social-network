import { GET_ALL_POST } from '../actions/post.action.js';

const initialState = {};

export default function allPostReducer (state = initialState, action) {
	switch (action.type) {
	case GET_ALL_POST:
		return action.payload;
	default:
		return state;
	}
}