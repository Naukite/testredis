const express = require('express');
const session = require('express-session');
const redis = require('redis');
const ejs = require('ejs')
const redisStore = require('connect-redis')(session);
const app = express();
const redisClient = redis.createClient();

app.use(session({
    secret: 'mysupersecret43$',
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: redisClient,
        ttl: 260
    }),
    saveUninitialized: true,
    resave: true
}))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.send(`testredis is running... Your session id is: ${req.sessionID}`);
})

app.listen(3000, () => {
    console.log(`testredis is running...`);
})

app.get('/login', (req, res) => {
    req.session.user = {
        name: "nau",
        email: "naukite@gmail.com",
        b1cookie: {
            SESSIONID: 'unchurroquenoveasdelargo',
            ROUTE: '.node1'
        }
    }
    res.render('login', {
        sessionID: req.sessionID
    });
})

app.get('/content', (req, res) => {
    res.render('content', {
        sessionID: req.sessionID,
        user: req.session.user
    });
})
