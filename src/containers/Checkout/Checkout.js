import React ,{Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCanceledHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredient={this.props.ings} checkoutContinue={this.checkoutContinueHandler} checkoutCanceled={this.checkoutCanceledHandler} />
                <Route 
                path={this.props.match.path+'/contact-data'}
                component={ContactData}
                  />
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.ingredient
    }
}

export default connect(mapStateToProps)(Checkout);
