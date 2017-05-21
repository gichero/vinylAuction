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
        {this.props.allImages.map((page, idx)

        )}

        </div>

    )
}

const HomePageContainer = ReactRedux.connect(
    state => state.HomePage,
    actions
)(HomePage);
export default HomePageContainer;
