import React , { Component } from 'react';
import { connect } from 'react-redux';

import classes from './auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as action from '../../store/actions/index'

class Auth extends Component {
    state = {
        controls : {
                email: {
                    inputType: 'input',
                    inputconfig:{
                        type: 'text',
                        placeholder: 'Your email'
                    },
                    value: ''
                 },
                 password: {
                    inputType: 'input',
                    inputconfig:{
                        type: 'password',
                        placeholder: 'password'
                    },
                    value: ''
                 }
            },
        isRegister: true
    }
    registerHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isRegister);
    }
    inputChangedHandler = (event, inputIdentifier)=>{
        const updatedControlsForm = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedControlsForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedControlsForm[inputIdentifier] = updatedFormElement;
        this.setState({controls: updatedControlsForm});
    }
    switchAuthHandler = () =>{
        this.setState(prevState =>{
            return{
                isRegister: !prevState.isRegister
            }
        })
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = (
            <form onSubmit={this.registerHandler}>
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        inputtype={formElement.config.inputType}
                        inputConfig={formElement.config.inputconfig}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        value={formElement.config.value} />
                ))}
                <Button btnType="Success" >Submit</Button>
            </form>
        );
        return(
            <div className={classes.Auth}>
                <h4>{this.state.isRegister ? 'Register' : 'Login'}</h4>
                {form}
                <Button btnType="Danger" clicked={this.switchAuthHandler}>Switch to {this.state.isRegister?"Login ":" Register"}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth : (email, password, isRegister) => dispatch(action.auth(email, password, isRegister))
    }
}

export default connect(null, mapDispatchToProps)(Auth);
