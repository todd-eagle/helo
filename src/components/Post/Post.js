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

    }


    getPost(){
        axios.get()
        .then()
        .catch
    }

    render(){
        const {title, img, content, author, authorPicture} = this.state
        return(
            <>
                <div>
                    <div>
                         <h1>{title}</h1>
                    </div>
                    <div>{author}{authorPicture}</div>
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