const express = require('express')
const app = express()
const mongoose = require('mongoose')
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
    }
})

const userModel = mongoose.model('user', userSchema)



app.post('/register',
    (req, res, next) => {
        if(req.body.userName.length >= 6) {
            if(req.body.fullName >= 3) {
                if(req.body.password >=6 && req.body.password <= 20){
                    next()
                }
                else{
                    res.send({
                        done:false,
                        message: 'Password should be atleast 6 char and atmost 20 char'
                    })
                }
            }
            else{
                res.send({
                    done : false,
                    message: "Fullname should be atleast 3 char long"
                })
            }
        }
        else{
            res.send(
                {
                    done:false,
                    message: "userName should be atleast 6 Char long"
                }
            )
        }
    },
    (req, res) => {
        let { userName, fullName, password } = req.body
        let data = { userName, fullName, password }
        new userModel(data).save().then((registeredUser) => {
            if (registeredUser) {
                res.send({
                    done: true,
                    registeredUser
                })

            }
        })
    })

app.post('/login', (req, res) => {
    var userName = req.body.userName
    var password = req.body.password
    userModel.findOne({ userName: userName }).then((user) => {
        if (user) {
            if (password == user.password) {
                res.send({
                    done: true,
                    message: "Login Successful!"
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

app.listen(5500, () => {
    console.log("Server is listening to you!");
})