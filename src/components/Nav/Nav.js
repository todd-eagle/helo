import React,  {Component} from 'react'
import {connect} from 'react-redux';
import './Nav.css'


class Nav extends Component {
    render(){
        return(
            <>
           <nav className="App-nav">
           <img src={this.props.user.profile_pic}  alt="profile pic"/>
           <p>{this.props.user.username}</p>
           </nav>
           </>
        )
    }
}

const mapStateToProps =  reduxState => reduxState

export default connect(mapStateToProps)(Nav)