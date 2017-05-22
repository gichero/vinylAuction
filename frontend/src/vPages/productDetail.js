import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './productDetail.actions';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

class ProductDetail extends React.Component{

    componentDidMount(){
            this.props.fetchImage(this.props.params.id);
    }

    componentWillReceiveProps(newProps){
        if(this.props.params.id !== newProps.params.id){
             this.props.fetchImage(newProps.params.id);
        }
    }
    render(){
        return(
            <div className='page'>
                <img className='detailPic' src={'/media/'+this.props.items.image_path}/>
                <div className='description'>
                    <h1>{this.props.items.name}</h1>
                    <p>{this.props.items.description}</p>
                    <h2>Starting Bid ${this.props.items.price}.00</h2>
                    <button><Link to="/">Back!</Link></button>
                    <button><Link to="/">Place Bid</Link></button>
                </div>
            </div>
        )
    }
}
const ProductDetailContainer = ReactRedux.connect(
    state =>state.ProductDetail,
    actions
)(ProductDetail);

export default ProductDetailContainer;
