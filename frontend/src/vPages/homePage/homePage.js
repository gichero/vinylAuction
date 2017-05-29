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
          <h4><Link to="/login">Login</Link></h4>
          
          <h4><Link to='/signup'>Sign Up</Link></h4>
          </div>
          </div>
      )

  }else{

      display = (
          <div className ="navbar">
          <div className = "logout">
          <h3>Welcome {this.props.userinfo.first_name}<button onClick={()=>this.props.logout()} className > logOut</button></h3>
          </div>
          </div>)
   }


    return(

        <div className = "page">
        {display}
        {this.props.allImages.map((page, idx)=>
            <div className="page" key={idx}>
            <img className="cover" src={'/media/' +page.image_path}/>
            <h3>{page.name}</h3>
            <h4>Starting bid ${page.price.toFixed(2)}</h4>
            <h4><a href={"/productDetail/"+page.id}/></h4>
            <button><Link to={"/productDetail/"+page.id}>Check it out!</Link></button>
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
