import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './productDetail.actions';
import * as HomepageActions from '../homePage/homePage.actions';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';

class ProductDetail extends React.Component{

    componentDidMount(){
            this.props.fetchImage(this.props.params.id);
            this.props.fetchProduct(this.props.params.id);
    }

    componentWillReceiveProps(newProps){
        if(this.props.params.id !== newProps.params.id){
             this.props.fetchImage(newProps.params.id);
        }
    }

    render(){
        // let mainDisplay = <p>Auction is open</p>;
        //
        // if () {
        //     mainDisplay = <p>Auction is closed</p>;
        // }
        return(
            <div className='pageDetail'>
                <img className='detailPic' src={'/media/'+this.props.ProductDetail.items.image_path}/>
                <div className='description'>
                    <h1>{this.props.ProductDetail.items.name}</h1>
                    <p>{this.props.ProductDetail.items.description}</p>
                    <h2>Starting Bid ${this.props.ProductDetail.items.price}.00</h2>
                    <h5>bid increments by $5</h5>

                    <button><Link to= "/">Previous Page</Link></button>
                     <button onClick={()=>this.props.placeBid({user:this.props.HomePage.userinfo.id, product:this.props.ProductDetail.items})}>Place a Bid</button>
                </div>
            </div>
        )
    }
}
const ProductDetailContainer = ReactRedux.connect(
    state =>state,
    Object.assign({}, actions, HomepageActions)
)(ProductDetail);

export default ProductDetailContainer;
