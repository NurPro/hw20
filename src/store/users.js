// import { useDispatch } from "react-redux";

const initialState = {
	users: [],
};

export const GET_USERS = 'GET_USERS';

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				usersData: action.payload,
			};

		default:
			return state;
	}
};

//* middleware function

export function getUsers() {
	return async (dispatch) => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		const data = await response.json();
		dispatch({ type: GET_USERS, payload: data });
	};
}
