import $ from 'jquery';
import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './checkout.actions';
import { Router, Route, hashHistory, Link, IndexRoute, IndexLink } from 'react-router';

class Checkout extends React.Component {
  componentDidMount() {
    this.props.getItems(this.props.userInfo.id);
  }


  render(){

    // let productList =
    return(
      <div>
        <h1>Checkout</h1>
        <h2>Shipping Address</h2>
        <h3>Name</h3>
        <div className="info">
        <input onChange={(event)=>this.props.write(event.target.value,'name')} className="name" type='text'/>
          <h3>Street</h3>
        <input onChange={(event)=>this.props.write(event.target.value,'street')} className="email" type='text'/>
          <h3>State</h3>
        <input onChange={(event)=>this.props.write(event.target.value,'state')} className="first" type='text'/>
          <h3>Zip</h3>
        <input onChange={(event)=>this.props.write(event.target.value,'zip')} className="last" type='text'/>
        <button>Submit</button>
        </div>
        <div className="cart">
          {}
        </div>
      </div>
    )}
  }

  const CheckoutContainer = ReactRedux.connect(
  state =>state.Checkout,
  actions
)(Checkout)

  export default CheckoutContainer;
