//import express from 'express' 
//const app = express()
const express = require('express')
const execSync = require('child_process').execSync
const formatter = require('./utils/eventFormatter')
const app = express()

const PORT = 8081

let callback, secret, id;

app.use(express.json());

let sendEvent = () => {
    fetch(callback, {
        method: 'POST',
        body: {
            "test": "test"
        }
    })
}
app.post('/mock/eventsub/subscriptions', (req, res) => {
    const body = req.body
    callback = body['transport']['callback']
    secret = body['transport']['secret']
    id = body['condition']['broadcaster_user_id']
    console.log(callback)
    //TODO: Execute shell cmds after storing this data
    //sendEvent()
    const command = formatter.createCommand("trigger", "update-redemption", {
        "-F": callback,
        "-s": secret,
        "-S": "fulfilled"
    })
    const output = execSync(command)
})

app.listen(PORT, () => {
    console.log("Server running")
})

