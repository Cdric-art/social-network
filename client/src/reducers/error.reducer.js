import { GET_POST_ERRORS } from "../actions/post.action.js";
import { GET_USER_ERRORS } from "../actions/user.actions.js";

const initialState = {postError: [], userError: []}

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST_ERRORS:
            return {
                postError: action.payload,
                userError: []
            };
        case GET_USER_ERRORS:
            return {
                userError: action.payload,
                postError: []
            }
        default:
            return state;
    }
}