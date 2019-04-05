import * as actionTypes from './actionTypes';

import Axios from 'axios';

export const addIngredient = (name)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredient = (ingredient)=>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredient: ingredient
    };
}

export const initIngredient = ()=>{
    return dispatch => {
        Axios.get('https://reactburgerbuilder-20481.firebaseio.com/ingredient.json')
            .then(res =>{
                dispatch(setIngredient(res.data));
            })
            .catch(e =>{
               
            });
    }
}

