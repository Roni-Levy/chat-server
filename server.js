require('dotenv').config()

const express = require('express')

const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

let Users = createUsers()

let Chats = createHardCodedChats();

app.get('/users', authenticationToken, (req, res) => {
    res.json(Users.filter(user => user.email === req.email))
})

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

    accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken : accessToken })
})

app.get('/contacts', authenticationToken, (req, res) => {
    const userEmail = req.email
    let contacts = []
    Chats.filter(chat => chat.firstChatting === userEmail || chat.secondCatting === userEmail).forEach(chat => {
        contacts.push({
            chatId: chat.id,
            contactName: userEmail === chat.firstChatting? chat.secondCatting: chat.firstChatting,
            lastMessage: chat.messages[chat.messages.length - 1],
        })
    })

    res.json(contacts)
})

app.post('/chat', authenticationToken, (req, res) => {
    console.log("u em: " + req.email + ". ch id: " + req.chatId)
    const userEmail = req.email
    const chat = Chats.forEach(item => {
        console.log("it id: " + item.chatId + ". re id: " + req.chatId)
        if(item.chatId === req.chatId) {
            console.log("Found item: " + item)
            return item;
        }
    })
    if(chat === null) return res.sendStatus(401)
    console.log(chat.firstChatting + " " + chat.secondCatting + " " + userEmail)
    if(chat.firstChatting !== userEmail && chat.secondCatting !== userEmail) return res.sendStatus(403)

    res.json(chat)
})

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        
        reqBody = req.body
        req.email = user.email
        req.body = reqBody
        next()
    })
}

app.listen(1234)

function createUsers() {
    let hardCodedUsers = []

    for(let i = 1; i <= 20; i++) {
        hardCodedUsers.push({
            id: i + 'Id1234',
            firstName: "name_" + i,
            lastName: 'lName_' + i,
            email: 'user_' + i + '@gmail.com',
            password: i + "Pass_1234"
        })
    }

    return hardCodedUsers
}
function createHardCodedChats() {
    let hardCodedChats = []

    for(let i = 0; i < Users.length - 1; i++) {
        for(let j = i + 1; j < Users.length; j++) {
            var newChat = {
                id: Users[i].id + '_' + Users[j].id,
                firstChatting: Users[i].email,
                secondCatting: Users[j].email,
                messages: createHardCodedMessages(Users[i].email, Users[j].email)
            }
            hardCodedChats.push(newChat)
        }
    }

    return hardCodedChats;
}

function createHardCodedMessages(firstChatting, secondCatting) {
    const FIVE_MINUTE_IN_MILLISECONDS = 5000;
    let hardCodedMessages = []
    var time = new Date();
    time.setHours(time.getHours() - 24);

    for(let i = 1; i <= 20; i++) {

        let newMessage = {
            sender: i % 2 === 0? firstChatting: secondCatting,
            seningTime: time.getTime() + i * FIVE_MINUTE_IN_MILLISECONDS,
            message: "Whats up?",
            readMessageStatus: "read",
        }

        hardCodedMessages.push(newMessage)
    }

    return hardCodedMessages
}