import React,  {Component} from 'react'
import axios from 'axios'


export default class Auth extends Component {
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
        .then()
        .catch()       
    }

    render(){
        const {username, password} = this.state
        return(
            <form onSubmit={e => this.register(e)}>
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
                <button type="submit">Register</button>

            </form>
        )
    }
}