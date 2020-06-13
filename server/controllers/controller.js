const bcryptjs = require('bcryptjs')

module.exports = {
    register: async( req, res ) => {
      const db = req.app.get('db');
      const {username, password} = req.body


      const registered = await db.check_for_user(username)

      if(registered[0]){
        return res.status(409).send('User already exists')
      }

      const profile_pic = `https://robohash.org/${username}`

      const hash = (bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)))

      const newUser = await db.register_user([username, hash, profile_pic])
      req.session.user = {
        id: newUser[0].id,
        username: newUser[0].username,
        profile_pic: newUser[0].profile_pic
    }
      res.status(200).send(req.session.user)
    },
    login: async( req, res ) => {
     
      const db = req.app.get('db');
      const {username, password} = req.body 

      const userFound = await db.check_for_user(username)
      
      if(!userFound[0]){
        return res.status(404).send('User not found! Please Register.')
      }

      const authenticate = bcryptjs.compareSync(password, userFound[0].password)
      if(authenticate){
        req.session.user = {
          id: userFound[0].id,
          username: userFound[0].username,
          profile_pic: userFound[0].profile_pic
        }
        return res.status(200).send(req.session.user)
      }
        res.status(403).send('Email or password is incorrect')
    },
    logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
    },
    getAllPosts: async( req, res ) => {
      const db = req.app.get('db');

      const posts = await db.get_all_user_posts()

      if(!posts[0]){
        return res.status(404).send('post not found')
      }

      res.status(200).send(posts)
    },
    sendPost: async ( req, res ) => {
      const db = req.app.get('db');
      const{title, img, content, author_id} = req.body

      const post = await db.submit_user_post([title, img, content, author_id])
     
      if(!post[0]){
        return res.status(500).send('Internal server error.  Cannot post right now')
      }

      res.status(200).send(post)
    },
    getPost: async( req, res ) => {
      const db = req.app.get('db');
      const {user_id} = req.params

      const userPost = await db.get_user_post(user_id)

      if(!userPost[0]) {
        return res.status(404).send('Post not found')
      }
      res.status(200).send(userPost)
    },
    searchPosts: async(req, res) => {
      const db = req.app.get('db');
      const {search} = req.query

      //console.log('Search criteria is: ', req.query)
      
      const searched = await db.search(search)

      if(!searched[0]){
        return res.status(404).send('No posts found')
      }

      return res.status(200).send(searched)

    }
  };