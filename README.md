After clone 
run "npm install"
run "npm run devStart"

The server will create array with 20 users
each user will be genrate like that 
{
    id: <usernumber>Id1234,
    firstName: "name_<usernumber>,
    lastName: lName_<usernumber>,
    email: user_<usernumber>@gmail.com,
    password: <usernumber>Pass_1234
}

For example user number 7 will be
{
    id: 7Id1234,
    firstName: "name_7,
    lastName: lName_7,
    email: user_7@gmail.com,
    password: 7Pass_1234
}

The server also generte chats for all user and each user have chat with any other user
Chat schema look like 
{
    id: <first user id>_<second user id>
    firstChatting: <first user email>,
    secondCatting: <second user email>,
    messages: [array with 20 messages] 
}

Message schema look like
{
    sender: <sender email>,
    seningTime: <sending time as long>,
    message: "Whats up?",
    readMessageStatus: "read",
}

The server will run at port 1234

The repo came for manipulate server side for testing the client side and it's not pretending to be a real server side