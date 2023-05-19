const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// let users = require('./Users');

app.use('/api/user', require('./routes/api/user'));

app.get('/', (req, res) => {
    res.json(users);
});

app.listen(3000, () => {
    console.log("Server started on port 3000")
});