import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './productDetail.actions';
import * as HomepageActions from '../homePage/homePage.actions';
import * as LoginActions from '../login/login.actions';
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

        let bid;

        if(this.props.ProductDetail.bid){
            bid =  <h3>Bid: {this.props.ProductDetail.bid}</h3>
        }else{

            bid =  <h3>Starting Bid {this.props.ProductDetail.items.price}</h3>
        }


        if(!this.props.ProductDetail){
            return <h1>Loading....</h1>;
        }
        else{
        return(
            <div className='pageDetail'>
                <img className='detailPic' src={'/media/'+this.props.ProductDetail.items.image_path}/>
                <div className='description'>
                    <h1>{this.props.ProductDetail.items.name}</h1>
                    <p>{this.props.ProductDetail.items.description}</p>
                    {bid}
                    <h5>bid increments by $5</h5>

                    <button><Link to= "/">Previous Page</Link></button>
                     <button onClick={()=>this.props.placeBid({
                         user:this.props.HomePage.userinfo.id, login:this.props.auth_token, product:this.props.ProductDetail.items
                     })}>Place a Bid</button>
                </div>
            </div>
        )
    }
}
}

const ProductDetailContainer =
ReactRedux.connect(
    state => Object.assign({},
    state,
    {auth_token:state.Login.userinfo &&
    state.Login.userinfo.auth_token}
), Object.assign({},actions, HomepageActions, LoginActions))(ProductDetail);

export default ProductDetailContainer;


// const ProductDetailContainer = ReactRedux.connect(
//     state =>state,
//     Object.assign({}, actions, HomepageActions)
// )(ProductDetail);
//
// export default ProductDetailContainer;
