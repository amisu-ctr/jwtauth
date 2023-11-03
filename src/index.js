require('dotenv/config');
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const {verify} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs')
const {fakeDB} = require('./fakeDB.js')


const server = express()

//Use express middleware for easier cookie handling
server.use(cookieParser())

server.use(
    cors({
        origin: 'https://localhost:3000',
        credentials: true
    })
);

// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({extended: true})); //support URL-encoded bodies

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

server.get('/', (req, res) => {
    console.log('hmaisu')
    res.status(200).send("<h1>Welcome<h1/>")
})

// 1. Register a user
server.post('/register', async (req, res) => {
    const {email, password} = req.body;
    try {
        // 1. check if user exist
        const user = fakeDB .find(user => user.email === email)
        if (user) throw new Error('User already exist')
        //if not user exist, hash the password
        const hashedPassword = await hash(password, 10)
        //Insert the user in 'database'
        fakeDB.push({
            id:fakeDB.length,
            email,
            password: hashedPassword
        })
        res.send({message: 'user created'})
        console.log(fakeDB);
    } catch(err) {
        res.send({
            error: `${err.message}`
        })
    }
})
