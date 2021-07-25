'use strict'

const express = require('express')
const fs = require('fs')
const https = require('https')
const path = require('path')

const app = express()
const directoryToServe = 'client'
const port = 4321

app.use('/', express.static(path.join(__dirname, '..', directoryToServe)))

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'serve.crt')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'serve.key'))
}

https.createServer(httpsOptions, app)
    .listen(port, function() {
        console.log(`Sreving the ${directoryToServe}/ directory at https://localhost:${port}`)
    })
`
// https.get('/baboo', (req, res) => {
//     res.json({ baboo: "babooooooooo" })
// })`
