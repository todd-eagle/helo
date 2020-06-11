import React,  {Component} from 'react'
import axios from 'axios'
import './Post.css'


export default class Post extends Component {
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

    componentDidMount(){
        this.getPost()
    }

    getPost(){
        const {id} = this.props.match.params
        axios.get(`/api/post/${id}`)
        .then(res => {
           this.setState({
            title: res.data[0].title,   
            img: res.data[0].img,
            content: res.data[0].content,
            author: res.data[0].username,
            authorPicture:res.data[0].profile_pic
           })
        }).catch(err =>{console.log(err)})
    }

    render(){
      
        const {title, img, content, author, authorPicture} = this.state
        return(
            <div className="App-post-page">
                <div className="App-post">
                     <div className="App-top-wrapper">
                        <div>
                            <h1 className="App-titie-heading">{title}</h1>
                        </div>
                        <div className="App-author">by {author}<img className="App-author-img" src={authorPicture} alt="Avatar Pic"/></div>
                    </div>    
                        
                    <div className="App-bottom-wrapper">
                        <div>
                                <img className="App-post-img" src={img} alt="pic"/>
                        </div>
                        <div className="App-content">{content}</div>
                    </div>
                </div>
            </div>
        )
    }
}