import React,  {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import './Form.css'


class Form extends Component {

    constructor(){
        super()
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    post(e){
        e.preventDefault()
        const {title, img, content} = this.state
        const author_id = this.props.user.id
        axios.post('/api/post', {title, img, content, author_id})
        .then(res => {
            this.props.history.push('/dashboard')
        })
        .catch(err =>{console.log(err)})
    }
   
    render(){
        const {title, img, content} = this.state
        
        return(
            <div className="App-form-page">
                 <div className="App-form">
                    <form className="App-form-post">
                        <h2>New Post</h2>
                        <p>Title:</p>
                        <input 
                            onChange={e => this.changeHandler(e)}
                            type="text"
                            name="title"
                            value={title}
                            placeholder="Enter Title"
                            required
                        />
                        <p>Image URL:</p>
                        <input 
                            onChange={e => this.changeHandler(e)}
                            type="text"
                            name="img"
                            value={img}
                            placeholder="Enter Image Path"
                            required
                        />
                        <p>Content:</p>
                        <textarea 
                            onChange={e => this.changeHandler(e)}
                            name="content"
                            value={content}
                            placeholder="Type Post"
                            required
                        >
                        </textarea>
                        <button onClick={e => this.post(e)}>Post</button>
                    </form>
                </div>>    
            </div>    
        )
    }
}
const mapStateToProps =  reduxState => reduxState

export default connect(mapStateToProps)(Form)