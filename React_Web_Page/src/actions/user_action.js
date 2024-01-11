import axios from 'axios';
import {Login_User} from './types';

export function loginUser(dataToSubmit){
    const request = axios.post('http://localhost:8080/login_sign', dataToSubmit)
    .then(response => response.data)

    return {
        type: Login_User,
        payload: request
    }
}