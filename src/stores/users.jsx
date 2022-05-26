import { legacy_createStore as createStore } from "redux";
import Cookies from 'js-cookie';



const initializeState = {
    token: Cookies.get('token')? Cookies.get('token') : "" ,
    id: Cookies.get('id')? Cookies.get('id') : ""
}

const login = (state = initializeState, action) => {
    if (action.type === 'LOGIN'){
        return {
            ...state,
            token: action.token,
            id: action.id
        }
    }
    return state;
}

const store = createStore(login);

export default store;