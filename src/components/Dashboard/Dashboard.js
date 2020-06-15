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

    setPosts(){
        const {userposts} =this.state
        console.log(userposts)
        if (this.state.userposts === false){
            console.log("Changed to false!!!!!!!!")
            this.getPosts()
        }else{
            console.log("Changed to True!!!")
            const posts1 = this.state.posts.filter((element, index)=> {
                if (element.author_id === this.props.user.id ){
                        return  element
                    }
                })
                console.log(posts1)
                this.setState({posts: posts1})
        }
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
                    <div className="App-search-container"> 
                        <div className="App-searchbar">
                            <input 
                                name="search"
                                type="text"
                                placeholder="Search by title"
                                onChange={e => this.changeHandler(e)}
                                value={search}
                            />

                            <img onClick={e => this.search(e)}  className="App-search-button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC" alt="search" />
                                        {/* <button onClick={e => this.search(e)}>Search</button> */}
                            <button onClick={e => this.reset()} className="App-search-reset">Reset</button>
                        </div>  
                        <div className="App-search-checkbox">
                            My Posts: 
                            <input 
                                type="checkbox"
                                name="userposts"
                                onChange={e =>  {this.setState({userposts: !userposts}); this.setPosts()}}
                            />     
                        </div>
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