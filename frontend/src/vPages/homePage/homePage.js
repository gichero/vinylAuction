import React from 'react';
import * as ReactRedux from 'react-redux';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';
import * as actions from './homePage.actions';

class HomePage extends React.Component {

    componentDidMount(){
        this.props.fetchImage();
    }

render() {

    let display;
     if(!this.props.userinfo){

      display = (
          <div className = "navbar">
          <div className = "loginform">

          <ul key ="signup"><Link to="/login">Login</Link></ul>
          <ul key ="login"><Link to='/signup'>Sign Up</Link></ul>
          </div>
          </div>
      )

  }else{

      display = (
          <div className ="navbar">
          <div className = "logout">
          <ul key="welcome"> Welcome {this.props.userinfo.first_name}<a href ="#" onClick={()=>this.props.logout()}>Logout</a></ul>

          <ul key="shoppingCart"><Link to="/shoppingCart">Cart</Link></ul>
          </div>
          </div>)
   }


    return(

        <div className = "page">
        {display}
        {this.props.allImages.map((page, idx)=>
            <div className="products" key={idx}>
            <img className="cover" src={'/media/' +page.image_path}/>
            <h3>{page.name}</h3>
            <h5>Starting bid ${page.price.toFixed(2)}</h5>
            <h5><a href={"/productDetail/"+page.id}/></h5>
            <h5><Link to={"/productDetail/"+page.id}>Check it out!</Link></h5>
            <h5>bid increments by $5</h5>
            </div>)}
        </div>
    )
}
}

const HomePageContainer = ReactRedux.connect(
    state => state.HomePage,
    actions
)(HomePage);
export default HomePageContainer;
