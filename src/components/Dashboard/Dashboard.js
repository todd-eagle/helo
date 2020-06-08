import React,  {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
// import Post from '../Post/Post'
import {Link} from 'react-router-dom';
import {logout} from '../../redux/reducer'
import Nav from '../Nav/Nav'
import './Dashboard.css'


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

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getPosts(){
        axios.get('/api/posts')
        .then(res => {
            this.setState({
                posts: res.data
            })
            console.log(this.state.posts)

        }).catch(err=>console.log(err))
    }

    search(e){
        e.preventDefault()
        const {search} = this.state
        console.log('state search is: ', search)
        axios.get('/api/search', search)
        .then(res => {
            console.log(res.data)
        }).catch(err=>console.log(err))
    }

    logoutUser(){
        axios.delete('/api/auth/logout')
        .then(() => {
            this.props.logout()
            this.props.history.push('/')
        })
        .catch()
    }
    
    render(){
        const userPosts = this.state.posts.map((element, index) => {
             const postLink = "post/" + element.id
           return <Link to={postLink}>
                <div>
                   <div>{element.title}</div>
                   <div> {element.username}</div>
                        <img src= {element.profile_pic} alt="User avatar"/>
                </div>
                </Link>                
        })

        // const {search} = this.state
        return(
           <div className="super">
                 <Nav />
            <div className="App-dashboard">
               
                {/* <button onClick={e => this.logoutUser()}>Logout</button> */}
                <div className="App-dashboard-container">
                    <div className="App-searchbar">
                        <form>
                            <input 
                                name="search"
                                type="text"
                                placeholder="Search"
                                onChange={e => this.changeHandler(e)}
                            />
                        </form>
                        <button onClick={e => this.search(e)}>Search</button>
                    </div>
                    <div className="App-posts-container">
                        {userPosts}
                    </div>
                </div>
            </div>
            </div>     
        )
    }
}

const mapStateToProps =  reduxState => reduxState

export default connect(mapStateToProps, {logout})(Dashboard)