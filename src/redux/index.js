import { combineReducers } from 'redux';
import auth from './reducers/auth';
import hotels from './reducers/hotels';

export default combineReducers({
    auth,
    hotels
});
