import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return {
        type : actionTypes.AUTH_START,
        authData: authData
    }
}

export const authFail = (error) =>{
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const auth = (email , password, isRegister) =>{
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        if(isRegister){
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBjdkAMA32DPVtsbvDu4QEeYZehP2ksHvI', authData)
                .then(res =>{
                    console.log(res);
                    dispatch(authSuccess(res.data));
                })
                .catch(err =>{
                    console.log(err);
                    dispatch(authFail(err));
                })
        }else{
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBjdkAMA32DPVtsbvDu4QEeYZehP2ksHvI', authData)
                .then(res =>{
                    console.log(res);
                    dispatch(authSuccess(res.data));
                })
                .catch(err =>{
                    console.log(err);
                    dispatch(authFail(err));
                })
        }
    }
}