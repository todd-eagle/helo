const bcryptjs = require('bcryptjs')

module.exports = {
    register: async( req, res ) => {
      const db = req.app.get('db');
      const {username, password} = req.body


      const registered = await db.check_for_user(username)

      if(registered[0]){
        return res.status(409).send('User already exists')
      }

      const hash = (bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)))

      const newUser = await db.register_user([username, hash])
      
      req.session.user = {
        id: newUser[0].id,
        username: newUser[0].username
    }
      res.status(200).send(newUser)

    },
    login: ( req, res ) => {
      const db = req.app.get('db');
    },
    getUserPosts: ( req, res ) => {
      const db = req.app.get('db');
    },
    sendPost: ( req, res ) => {
      const db = req.app.get('db');
    },
    getPost: ( req, res ) => {
      const db = req.app.get('db');
    }
  };