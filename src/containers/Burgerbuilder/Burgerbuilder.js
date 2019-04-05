import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import Ordersummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// import Axios from 'axios';
import * as burgerBuilderActions from '../../store/actions/index';


class Burgerbuilder extends Component{
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false
    }
    componentDidMount(){
        this.props.onIngredientFetched();
    }


    updatePurchaseState(totalPrice){
        if(totalPrice > 4){
            return true;
        }else{
            return false;
        }
    }

    purchasingHandler = ()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = ()=>{
        this.props.history.push('/checkout');
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let OrderSummary = null;

        let burger = <Spinner />
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredient={this.props.ings} />
                <Buildcontrols 
                    ingredientadded={this.props.onIngredientAdded} 
                    ingredientremoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchaseable={this.updatePurchaseState(this.props.totalPrice)}
                    ordered={this.purchasingHandler}
                    price={this.props.totalPrice} />
                </Aux>
            );

            OrderSummary =  <Ordersummary 
            ingredient={this.props.ings} 
            totalPrice={this.props.totalPrice}
            modalHide={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler} />;
    
        }
        if(this.state.loading){
            OrderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing}  modalHide={this.purchaseCancelHandler}>
                   {OrderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredient,
        totalPrice: state.totalPrice
    };
}
const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onIngredientFetched: () => dispatch(burgerBuilderActions.initIngredient())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Burgerbuilder);

