import * as actionTypes from './actionTypes';
import { COMMENTS } from '../shared/comments';

//comment reducer 
export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case actionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return state.concat(comment);

        default:
          return state;
      }
};
//reducer In other words, (state, action) => newState , fn take current state n action n return new state