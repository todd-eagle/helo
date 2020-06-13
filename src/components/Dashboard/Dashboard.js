import React,  {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
// import Post from '../Post/Post'
import {Link} from 'react-router-dom';
import {logout} from '../../redux/reducer'
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

    reset() {
        this.getPosts()
        this.setState({search: ''})
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

    search = (e) =>{
        e.preventDefault()
        axios.get(`/api/search?search=${this.state.search}`)
        .then(res => {
            console.log("res.data is: ", res.data)
            this.setState({
                posts: res.data
            })
            console.log(res.data)
        }).catch(err=>console.log(err))
    }

    
    render(){
        const {search, userposts} = this.state
        const postsByUsers = this.state.posts.map((element, index) => {
             const postLink = "post/" + element.id
           return <div key={element.index} className="App-user-posts">
                    <Link className="App-post-link" to={postLink}>
                        <div className="App-post-title" >{element.title}</div>
                        <div className="App-user-info"> <p>{element.username}</p><img className="App-post-avatar" src= {element.profile_pic} alt="User avatar"/></div>      
                    </Link>       
                </div>                   
        })

        return(
            <div className="App-dashboard">
               
                <div className="App-dashboard-container">
                    <div  className="App-searchbar">
                        <form>
                            <input 
                                name="search"
                                type="text"
                                placeholder="Search by title"
                                onChange={e => this.changeHandler(e)}
                                value={search}
                            />
                            <input 
                                type="checkbox"
                                name="userposts"
                                checked={userposts}
                                onChange={e => this.setState({userposts: !userposts})}
                            />
                        </form>

                        <button onClick={e => this.search(e)}>Search</button>
                        <button onClick={e => this.reset()}>Reset</button>
                    </div>
                    <div className="App-posts-container">
                        {postsByUsers}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  reduxState => reduxState

export default connect(mapStateToProps, {logout})(Dashboard)