import * as actionTypes from '../actions/actionTypes';
    
const initialState = {
    ingredient:null,
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.3,
    meat: 1.2,
    bacon: 0.8,
    cheese: 1.2
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return{
                ...state,
                ingredient : {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case(actionTypes.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredient : {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case(actionTypes.SET_INGREDIENTS):
            return{
                ...state,
                ingredient: action.ingredient
            }
        default:
            return state;
    }
}

export default reducer;

