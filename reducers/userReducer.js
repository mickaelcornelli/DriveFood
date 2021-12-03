import {CONNECT_USER, LOGOUT_USER} from '../actions/user/actions-type';

const initialState = {
    isLogged: false,
    infos: []
}

const UserReducer = (state = initialState, action)=>{
    switch(action.type) {
        case CONNECT_USER:
            return {isLogged: true, infos: action.payload}
        break;

        case LOGOUT_USER:
            return initialState;
        break;
    }

    return state
}

export default UserReducer;