import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './shoppingCart.actions';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

class ShoppingCart extends React.Component{

    componentDidMount(){
        if(this.props.auth_token){
            this.props.getShoppingcart(this.props.auth_token);
        }
    }

    componentWillReceiveProps(newProps){
        if(this.props.auth_token !== newProps.auth_token){
            this.props.getShoppingcart(newProps.auth_token);
        }
    }

    render(){
        return(
            <div className = 'shoppingCart'>
                <h2>Shopping Cart</h2>
                <ul>
                {this.props.cartItems.map(product=>
                <li key={product.image_path}>{product.id}>{product.name} - ${product.price}</li>
            )}
                </ul>
                <button>Checkout</button>
            </div>
        )
    }
}

const ShoppingCartContainer = ReactRedux.connect(
    state => Object.assign({}, state.ShoppingCart, {
        auth_token: state.Login.userinfo && state.Login.userinfo.auth_token
    }),
    actions
)(ShoppingCart);

export default ShoppingCartContainer;
