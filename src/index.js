require('dotenv/config');
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const {verify} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs')

const {createAccessToken, createRefreshToken} = require('./tokens.js')

const {fakeDB} = require('./fakeDB.js')

//1. Register a user
//2. Login a user
//3. Logout a user
//4. Setup a protected route
//5. Get a new accesstoken with a refresh token

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

// 2. Login a user 
server.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        // 1. Find user in 'Database'. if not  send eror
        const user = fakeDB.find(user => user.email === email);
        if(!user) throw new Error("User does not exist");
        //2.Compare crypted password and see if it checks out. send errir if not
        const valid = await compare(password, user.password);
        if (!valid) throw new Error("Password not correct");
        // 3. Create Refresh- and Accesstoken
        const Accesstoken = createAccessToken(user.id)
        const refreshtoken = createRefreshToken(user.id)
        // 4. Put the refreshtokenin the "database"
        user.refreshtoken = refreshtoken
        console.log(fakeDB)
    } catch(err) {

    }
})
