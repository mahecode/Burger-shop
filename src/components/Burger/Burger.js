import React from 'react';
import classes from './Burger.css';
import Burgeringredient from './Burgeringredients/Burgeringredients';

const burger = (props)=>{
    let transformendIngredient = Object.keys(props.ingredient)
        .map(igKey =>{
            return [...Array(props.ingredient[igKey])].map((_,i)=>{
                return <Burgeringredient key={igKey + i} type={igKey} />;
            });
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
    if(transformendIngredient.length === 0){
        transformendIngredient =  <p>Start adding items</p>
    }
    
    return(
        <div className={classes.burger}>
            <Burgeringredient type="bread-top" />
            {transformendIngredient}
            <Burgeringredient type="bread-bottom" />
        </div>
    );
}

export default burger;