import React from'react';

import classes from './Input.css'

const input = (props)=>{
    let inputElement = null;
    switch(props.inputtype){
        case('input'):
            inputElement = <input className={classes.InputElement} {...props.inputConfig} value={props.value} onChange={props.changed} />;
            break;
        case('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props.inputConfig} value={props.value} onChange={props.changed} />
            break;
        case('select'):
            inputElement = <select 
                className={classes.InputElement} 
                value={props.value} 
                onChange={props.changed}>
                {props.inputConfig.options.map( option =>(
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}</select>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.inputConfig} value={props.value} />;
    }
    return(
        <div className={classes.Input}>
            <fieldset className={classes.Fieldset}>
                {inputElement}
                <label className={classes.Label}>{props.value}</label>
                <div className={classes.after}></div>
            </fieldset>
        </div>
    );
}

export default input;

