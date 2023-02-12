require('dotenv').config()
require('./db/connect')
const express = require('express')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const cors = require('cors')
const User = require('./db/models/user')
const Todo = require('./db/models/todo')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  expressjwt({
    secret: process.env.SECERT_KEY,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: (req) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      }
      return null
    }
  }).unless({ path: ['/login', '/register'] })
)
// TODO ROUTER //
// /todo?var1=value1&var2=value2
app.get('/todo', async (req, res) => {
  try {
    const queryData = req.query
    const todoList = await Todo.find(queryData)

    if (todoList.length === 0) {
      return res.status(404).send('not found')
    }
    res.json(todoList)
  } catch (e) {
    res.json(e)
  }
})

app.get('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findById(id)

    if (!todo) {
      return res.status(404).send('not found')
    }

    res.json(todo)
  } catch (e) {
    res.json(e)
  }
})

app.post('/todo', async (req, res) => {
  try {
    const { title, description, subTitle } = req.body

    const data = {
      title,
      description,
      subTitle
    }

    const result = await Todo.create(data)
    res.json(result)
  } catch (e) {
    res.json(e)
  }
})

app.patch('/todo', async (req, res) => {
  try {
    const { id, status } = req.body
    const result = await Todo.findByIdAndUpdate(id, { status }, { new: true })

    res.json(result)
  } catch (e) {
    res.json(e)
  }
})

app.patch('/todo/finish/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await Todo.findByIdAndUpdate(id, { status: true }, { new: true })
    res.json(result)
  } catch (e) {
    res.json(e)
  }
})

app.patch('/todo/waiting/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await Todo.findByIdAndUpdate(id, { status: false }, { new: true })
    res.json(result)
  } catch (e) {
    res.json(e)
  }
})

app.delete('/todo', async (req, res) => {
  try {
    const { id } = req.body
    const result = await Todo.findByIdAndRemove(id)

    res.json(result)
  } catch (e) {
    res.json(e)
  }
})

// USER ROUTER //
// POST สำหรับเพิ่มข้อมูล
app.post('/register', async (req, res) => {
  try {
    const { username, password, name } = req.body

    const data = {
      username,
      password,
      name
    }
    const result = await User.create(data)

    res.json(result)
  } catch (e) {
    console.error(e)
    res.json({
      message: e.message
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status('404').send('User not found')
    }

    const isValid = await user.verifyPassword(password)

    if (isValid) {
      const payload = {
        userId: user._id,
        username: user.username
      }

      const token = jwt.sign(payload, process.env.SECERT_KEY, { algorithm: 'HS256' })

      res.json({
        token
      })
    } else {
      res.status(401).send('Password is invalid!!')
    }
  } catch (e) {
    res.json(e)
  }
})

// GET สำหรับขอข้อมูล
app.get('/user', async (req, res) => {
  try {
    const queryData = req.query
    const users = await User.find(queryData)

    res.json(users)
  } catch (e) {
    res.json(e)
  }
})

app.get('/user/get-by-name/:name', async (req, res) => {
  try {
    const { name } = req.params
    const user = await User.findOne({ name })
    if (!user) {
      return res.status(404).send(`User ${name} not found`)
    }

    res.json(user)
  } catch (e) {
    res.json(e)
  }
})

app.get('/user/get-by-id/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    res.json(user)
  } catch (e) {
    res.json(e)
  }
})

// PATCH สำหรับอัพเดทข้อมูลบางฟิล
app.patch('/user', async (req, res) => {
  try {
    const { newPassword, userId } = req.body

    // Param1: Condition, Param2: Update, Param3: Options
    // const result = await User.findOneAndUpdate({ _id: userId }, { password: newPassword }, { new: true })

    // Param1: _id , Param2: Update, Param3: Options
    const result = await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true })

    res.json(result)
  } catch (e) {
    res.json(e)
  }
})

// DELETE สำหรับลบข้อมูล
app.delete('/user', async (req, res) => {
  try {
    const { userId } = req.body
    const result = await User.findByIdAndRemove(userId)

    res.json(result)
  } catch (e) {
    res.json(e)
  }
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.DOMAIN}:${process.env.PORT}`))
