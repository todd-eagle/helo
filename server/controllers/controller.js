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
    login: async( req, res ) => {
     
      const db = req.app.get('db');
      const {username, password} = req.body 

      const userFound = await(db.check_for_user(username))
      
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
        return res.status(403).send('Email or password is incorrect')
    },
    logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
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