import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants/constantAuth';

const initialState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                loading: false,
                error: null
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null
            };
        default:
            return state;
    }
};

export default authReducer;
