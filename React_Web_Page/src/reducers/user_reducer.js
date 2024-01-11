import { Login_User } from "../actions/types";

export default function(state = {}, action){
    switch(action.type){
        case Login_User:
            return {...state, loginSuccess: action.payload};
        default:
            return state;
    }
}