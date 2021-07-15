


// TODO: Refactor in the future on authentication process




require('dotenv').config()


const express = require('express')

const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/register', (req, res) => {
    let user = Users.filter(elm => elm.email === req.body.email)[0]

    if(user) return res.sendStatus(401)

    user = {
        id: req.body.firstName + 'Id1234',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    Users.push(user)

    accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken : accessToken })
})

app.post('/login', (req, res) => {
    const user = Users.filter(elm => elm.email === req.body.email)[0]

    if(!user) return res.sendStatus(401)

    if(user.password !== req.body.password) return res.sendStatus(403)

    accessToken = generateToken(user)
    refreshToken = jwt.sign(user)
    res.json({ accessToken : accessToken })
})

app.post('/logout',(req, res) => {

})

function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

app.listen(4321)