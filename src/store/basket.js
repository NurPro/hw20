import { fetchRequest } from '../lib/fetchAPI';

const initialState = {
	basketData: [],
	totalAmount: 0,
	amount: 0,
};

export const basketActionTypes = {
	GET_BASKET: 'GET_BASKET',
	INCREMENT_BASKET_ITEM: 'INCREMENT_BASKET_ITEM',
	DECREMENT_BASKET_ITEM: 'DECREMENT_BASKET_ITEM',
	DELETE_BASKET_ITEM: 'DELETE_BASKET_ITEM',
};

export const basketReducer = (state = initialState, action) => {
	switch (action.type) {
		case basketActionTypes.GET_BASKET:
			return {
				...state,
				basketData: action.payload,
			};

		case basketActionTypes.INCREMENT_BASKET_ITEM:
			return {
				...state,
				basketData: action.payload,
			};
		case basketActionTypes.DECREMENT_BASKET_ITEM:
			return {
				...state,
				basketData: action.payload,
			};
		default:
			return state;
	}
};

export function getBasket() {
	return async (dispatch) => {
		try {
			const response = await fetchRequest('/basket');
			dispatch({ type: basketActionTypes.GET_BASKET, payload: response.items });
		} catch (err) {}
	};
}

export function incrementAmount(id, amount) {
	return async (dispatch) => {
		const response = await fetchRequest(`/basketItem/${id}/update`, {
			method: 'PUT',
			body: { amount: amount + 1 },
		});
		dispatch({
			type: basketActionTypes.INCREMENT_BASKET_ITEM,
			payload: response.items,
		});
	};
}

export function decrementAmount(id, amount) {
	return async (dispatch) => {
		if (amount !== 0) {
			const response = await fetchRequest(`/basketItem/${id}/update`, {
				method: 'PUT',
				body: { amount: amount },
			});

			dispatch(getBasket());
			return response.items;
		} else {
			const response = await fetchRequest(`/basketItem/${id}/delete`, {
				method: 'DELETE',
			});

			dispatch(getBasket());
			return response.items;
		}
	};
}
