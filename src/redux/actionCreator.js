import * as ActionTypes from './actionTypes';
import { DISHES } from '../shared/dishes';

//action fn, typen payload object n pass arg if neccesary
//the payload in a comment with 4 argument
//COMMENT
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

//DISHES
//redux thunk fn, in fn has fn n can inject in this case dispatch(), dispatch fn receive action fn
export const fetchDishes = () => (dispatch)=> {
    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES))
    }, 2000)
};

export const dishesLoading = () =>({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess)=> ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes =(dishes)=> ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

