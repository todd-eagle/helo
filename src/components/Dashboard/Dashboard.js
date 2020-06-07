import React,  {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import Post from '../Post/Post'

class Dashboard extends Component {
  constructor(){
      super()
      this.state = {
          posts: [],
          search: '',
          userposts: true
      }
  }

  componentDidMount() {
      this.getPosts()
  }

  getPosts(){
        axios.get('/api/posts')
        .then(res => {
            this.setState({
                posts: res.data
            })
        }).catch(err=>console.log(err))
  }

    render(){
        const t = this.state.posts.map((element, index) => {
           return <div>
                    {element.title}
                    {element.username}
                    {element.profile_pic}
                  </div>                
        })
        return(
            <div>
                {t}
            </div>
        )
    }
}

const mapStateToProps =  reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)