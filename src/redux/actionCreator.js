import * as ActionTypes from './actionTypes';

//action fn, typen payload object n pass arg if neccesary
//the payload in a comment with 4 argument

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});