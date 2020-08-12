
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { users } = require('./state')
// use this port or else use 4000
const port = process.env.PORT || 4000

// bodyParser -
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }));

/* BEGIN - create routes here */

let counter = users.length+1

// GET /users
app.get('/users',(req, res) => {
  res.json(users)
})
///users/:userId - 1 option
app.get('/users/:userId', (req,res) => {
  res.json(users[req.params.userId-1])
});
// 2 option
app.get('/users/:userId', (req, res) => {
  let id = parseInt(req.params.userId)
  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === id) {
      res.json(users[i])
    }
  }
})

// response.json(users.filter( user => user._id === parseInt(req.params.id)))

//GET /users/1
// app.get('/users/1',(req, res) => {
//   res.json(users[0])
// })

//POST /users
app.post('/users', (req,res) => {
  console.log(req.body)
  users.push({_id: counter++, ...req.body});
  res.json(users[users.length-1]);
});

// // PUT /users/1
app.put('/users/:userId', (req, res) => {
  let foundUser = (users.filter( user => user._id === parseInt(req.params.userId)))
  let user = foundUser[0]
  user.name = req.body.name ? req.body.name : user.name
  user.avatar = req.body.avatar ? req.body.avatar : user.avatar
  user.occupation = req.body.occupation ? req.body.occupation : user.occupation
  res.json(user)
})

// //DELETE /users/1
app.delete('/users/:userId', (req, res) => {
  let foundUser = (users.filter( user => user._id === parseInt(req.params.userId)))
  let user = foundUser[0]
  if (user) {
    user.isActive = false
    res.send("The deed is done")
  } else {
      res.status(400).json({ message: `No member with the id of ${req.params.userId}`})
    }
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`My app is listening on port ${port}at ${new Date}!`))