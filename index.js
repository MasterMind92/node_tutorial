const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// let users = require('./Users');


app.get('/api', (req, res) => {
    res.json({
        message: "Salut ! Bienvenue sur le service API"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'clef secrete', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post created...",
                authData
            })
        }
    });

});

app.get('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: "MAD225",
        email: "dalomarc@gmail.com"
    }

    jwt.sign({ user: user }, 'clef secrete', (err, token) => {
        res.json({
            token,
        });
    })
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403) //forbidden 
    }
}


app.listen(3000, () => {
    console.log("Server started on port 3000")
});