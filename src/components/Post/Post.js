import React,  {Component} from 'react'
import axios from 'axios'


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
            <>
                <div>
                    <div>
                         <h1>{title}</h1>
                    </div>
                    <div>{author} <img src={authorPicture} alt="Avatar Pic"/></div>
                </div>
                <div>
                    <img src={img} 
                    alt="Post picture"/>
                </div>
                <div>{content}</div>
            </>
        )
    }
}