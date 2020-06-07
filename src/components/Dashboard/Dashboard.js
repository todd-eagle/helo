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
                    <div>{element.title}</div>
                   <div> {element.username}</div>
                   
                        <img src= {element.profile_pic} />
                  </div>                
        })
        return(
            <div>
                <div>
                <form>
                    <input 
                        name="search"
                        type="text"
                        placeholder="Search"
                    />
                </form>
                <button>Search</button>
            </div>
                {t}
            </div>
        )
    }
}

const mapStateToProps =  reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)