import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props)=>{
    const ingredientSummary = Object.keys(props.ingredient)
        .map(igKey =>{
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredient[igKey]}</li>
            })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
            <Button btnType="Danger" clicked={props.modalHide}>Cancel</Button>
        </Aux>

    );
}

export default orderSummary;