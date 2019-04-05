import React ,{ Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders';

class ContacData extends Component{
    state = {
        orderForm : {
                name: {
                    inputType: 'input',
                    inputconfig:{
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                 },
                number:  {
                    inputType: 'input',
                    inputconfig:{
                        type: 'text',
                        placeholder: 'Your Number'
                    },
                    value: ''
                 },
                street:  {
                    inputType: 'input',
                    inputconfig:{
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                 },
                pincode:  {
                    inputType: 'input',
                    inputconfig:{
                        type: 'text',
                        placeholder: 'Pincode'
                    },
                    value: ''
                 },
                email:  {
                    inputType: 'input',
                    inputconfig:{
                        type: 'text',
                        placeholder: 'Your E-mail'
                    },
                    value: ''
                 },
                 deliveryMethod: {
                    inputType: 'select',
                    inputconfig:{
                        options:[
                            {value: 'fastest',displayValue: 'Fastest'},
                            {value: 'cheapest',displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                 },
        },
        loading: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        const orderData = {};
        for(let formData in this.state.orderForm){
            orderData[formData] = this.state.orderForm[formData].value;
        }
        this.setState({loading: true});
        const order = {
            ingredient: this.props.ingredient,
            totalPrice: Number.parseFloat(this.props.price).toFixed(2),
            orderData: orderData
        }
        axios.post('/orders.json',order)
            .then(res=> {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(e=> {
                this.setState({loading: false});
            });
    }
    inputChangedHandler = (event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        inputtype={formElement.config.inputType}
                        inputConfig={formElement.config.inputconfig}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        value={formElement.config.value} />
                ))}
                <Button btnType="Success" >Order now</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredient : state.ingredient,
        price : state.totalPrice
    }
}
export default connect(mapStateToProps)(ContacData);