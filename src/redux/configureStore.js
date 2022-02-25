import { createStore, combineReducers} from 'redux';
import { Comments } from './comments';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Promotions } from './promotions';


export const ConfigureStore = () => {

  //const store = createStore( Reducer, initialState);
  const store = createStore(
    combineReducers({
       dishes: Dishes,
       leaders: Leaders,
       promotions: Promotions,
       comments: Comments
    })
  );
  
  return store;
}; 