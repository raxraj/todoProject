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

app.post('/register', (req, res) => {
    let { userName, fullName, password } = req.body
    let data = { userName, fullName, password }
    new userModel(data).save().then((registeredUser)=> {
        if(registeredUser) {
            res.send({ 
                done: true,
                registeredUser
            })
            
        }
    })
})

app.listen(5500, () => {
    console.log("Server is listening to you!");
})