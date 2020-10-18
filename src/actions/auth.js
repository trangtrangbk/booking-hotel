import service, { setAuthToken } from '../service/service';
import { LOGIN_SUCCESS, LOGIN_FAILED, USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN } from './types';

export const loginUser = (email, password) => async dispatch => {
    const data = {
        email: email,
        password: password
    };
    dispatch({type : LOGIN})
    try {
        const res = await service.post('/login', data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.data.token
            }
        });
        // dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: LOGIN_FAILED
        });
    }
};

export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.getItem('token'));
    try {
        const res = await service.get('/users/me');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const logout = () => async dispatch => {
    try {
        await service.post('/users/logout');
    } catch (e) { }
    dispatch({
        type: LOGOUT
    });
};
