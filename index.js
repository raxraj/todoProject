const express = require('express')
const app = express()
const mongoose = require('mongoose')
const joi = require('joi')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://127.0.0.1:27017/dome', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => { console.log("MongoDB Connected") },
        (err) => { console.log("err") }
    )

app.use(express.json())
app.use(require('cors')())

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [
        {
            todotext: {
                type: String,
                required: true
            },
            isDone: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

const userModel = mongoose.model('user', userSchema)



app.post('/register', (req, res) => {
    let schema = joi.object({
        userName: joi.string().alphanum().min(6).max(20),
        fullName: joi.string().alphanum().min(3).max(20),
        password: joi.string().alphanum().min(8).max(20),
    })
    let { userName, fullName, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    let data = { userName, fullName, password }

    const validation = schema.validate(data)
    if (validation.error) {
        return res.send({ done: false, message: validation.error.details[0].context.key })

    }
    data.password = hashedPassword

    userModel.findOne({ userName: userName }).then(foundUser => {
        if (foundUser) {
            return res.send({ done: false, message: 'userName' })
        }
        else {
            new userModel(data).save().then((registeredUser) => {
                if (registeredUser) {
                    res.send({
                        done: true,
                        registeredUser
                    })

                }
            })
        }
    })
})

app.post('/login', (req, res) => {
    var userName = req.body.userName
    var password = req.body.password
    userModel.findOne({ userName: userName }).then((user) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.send({
                    done: true,
                    message: "Login Successful!",
                    user: user
                })
            }
            else {
                res.send({
                    done: false,
                    message: "Password incorrect!"
                })
            }
        }
        else {
            res.send({
                done: false,
                message: "User not Found!"
            })
        }
    })
})

app.post('/addTodo', (req, res) => {
    const { userName, todotext } = req.body
    userModel.findOne({ userName }).then(foundUser => {
        if (foundUser) {
            foundUser.todos.push({ todotext })
            foundUser.save().then(updatedUser => {
                if (updatedUser) {
                    res.send({ done: true, updatedUser })
                }
            })
        }
    })
})

app.post('/getTodos', (req, res) => {
    const { userName } = req.body
    userModel.findOne({ userName }).then(foundUser => {
        if (foundUser) {
            console.log(foundUser)
            res.send({
                done: true,
                todos: foundUser.todos
            })
        }
    })
})

app.post('/doneTodo', (req, res) => {
    const { userName } = req.body
    const { todoID } = req.body
    userModel.findOne({ userName }).then(foundUser => {
        if (foundUser) {
            let flag = false;
            let pos;
            for (let i = 0; i < foundUser.todos.length; i++) {
                if (foundUser.todos[i]._id == todoID) {
                    pos = i;
                    flag = true;
                    break;
                }
                else {
                    flag == false;
                    continue;
                }
            }
            if (flag) {
                foundUser.todos[pos].isDone = true;
                foundUser.save()
                    .then((updatedUser) => {
                        res.send({ done: true })
                    })
            }
            else {
                res.send({ done: false, message: 'Todo Not Found' })
            }
        }
        else {
            res.send({ done: false, message: 'No user exists' })
        }
    })
})
app.listen(5500, () => {
    console.log("Server is listening to you!");
})