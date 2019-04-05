import React , { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

class Orders extends Component {
    state  = {
        orders: [],
        loading: true
    }
    componentDidMount(){
        axios.get('orders.json')
            .then(res=> {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading:false,orders: fetchedOrders});
                // console.log(fetchedOrders);
            })
            .catch(e => {
                this.setState({loading:false});
            })
    }
    render(){
        return(
            <div>
                {this.state.loading === true ? <Spinner />:null}
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredient={order.ingredient}
                        price={order.totalPrice} />
                ))}
            </div>
        );
    }
}

export default Orders;