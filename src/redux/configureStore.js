import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Comments } from './comments';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Promotions } from './promotions';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {

  //const store = createStore( Reducer, initialState);
  const store = createStore(
    combineReducers({
       dishes: Dishes,
       leaders: Leaders,
       promotions: Promotions,
       comments: Comments,
       ...createForms({feedback: InitialFeedback})
    }),
    applyMiddleware(thunk, logger)
  );
  
  return store;
}; 