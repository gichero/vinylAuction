import React from 'react';
import * as ReactRedux from 'react-redux';
import {Link} from 'react-router';
import * as actions from './homePage.actions';


class HomePage extends React.Component {
    componentDidMount(){
        this.props.fetchImage();
    }
}

render(){
    return(
        <div className = "page">
        {display}
        {this.props.allImages.map((page, idx)=>
            <div className="page" key={idx}>
            <img className="cover" src={'/media' +page.image_path}/>
            <h3>{page.name}</h3>
            <h4>${page.price.toFixed(2)}</h4>
            <h4><a href={"/productDetail/"+page.id}/></h4>
            <button><Link to={"/productDetail/"+page.id}>Place Bid!</Link></button>
            <button><Link to={"/productDetail/"+page.id}>Check it out!</Link></button>
            </div>)}
        </div>
    )
}

const HomePageContainer = ReactRedux.connect(
    state => state.HomePage,
    actions
)(HomePage);
export default HomePageContainer;
