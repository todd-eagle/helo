import React,  {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import {login} from '../../redux/reducer'


class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        const {username, password} = this.state
        axios.post('/api/auth/register', {username, password})
        .then( res => {
            this.props.login(res.data)
            this.props.history.push('/dashboard')
        })
        .catch(err =>{console.log(err)})    
    }

    login = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        axios.post('/api/auth/login', {username, password})
        .then( res => {
            this.props.login(res.data)
            this.props.history.push('/dashboard')
        })
        .catch(err =>{console.log(err)})    
    }

    render(){
        const {username, password} = this.state
        return(
            <form>
                <input 
                type="text"
                name="username"
                value={username}
                required
                onChange={e => this.onChangeHandler(e)}
                />
                 <input 
                type="password"
                name="password"
                value={password}
                required
                onChange={e => this.onChangeHandler(e)}
                /> 
                <button type="submit" onClick={e => this.register(e)}>Register</button>
                <button type="submit" onClick={e => this.login(e)}>Login</button>

            </form>
        )
    }
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps, {login})(Auth)