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
            <div className = "loginSignup">
                <p key ="signup"><Link to="/login">Login</Link></p>
                <p key ="login"><Link to='/signup'>Sign Up</Link></p>
            </div>
          </div>
      )

  }else{

      display = (
          <div className ="navbar">
          <div className = "logout">
          <p className = "welcome" key="welcome"> Welcome {this.props.userinfo.first_name}<a href ="#" onClick={()=>this.props.logout()}> Logout</a></p>
          </div>
          </div>)
   }


    return(

        <div className = "page">
        <div className = "logopic">
        <span className=" span">
        <h1 className = "logotext">WELCOME</h1>
        <h2 className = "logotext2">vinylAuction.com</h2>
        </span>
        </div>
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
