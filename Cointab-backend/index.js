let mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

let connection = mysql.createConnection({
    host: "DESKTOP-VUNKNOA",
    port: 3306,
    user: "root",
    password: "12345",
    database: "cointab"
});

const app = express();
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.json());

connection.connect((err) =>{
    if(err) return console.log("Error: ", err);
    console.log('Connected to the MySQL server.');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});


app.get('/login', function(req, res) {
    res.send('Login Page');
});

let loginAttempts = {};

app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!loginAttempts[email]) {
        loginAttempts[email] = {attempts: 0, timestamp: Date.now()};
    }

    let elapsedTime = Date.now() - loginAttempts[email].timestamp;
    if (loginAttempts[email].attempts >= 5 && elapsedTime < 24*60*60*1000) {
        res.json({message: 'You have been blocked for 24 hours'});
        return;
    }

    connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (results.length > 0) {
            if (password == results[0].password) {
                loginAttempts[email] = {attempts: 0, timestamp: Date.now()};
                res.redirect(`/home?email=${email}`);
            } else {
                loginAttempts[email].attempts++;
                res.json({message: 'Incorrect password'});
            }
        } else {
            res.json({message: 'Incorrect email'});
        }
    });
});

app.get('/home', function(req, res) {
    var email = req.query.email;
    console.log("email",email);
    res.json({message: `Welcome ${email}`, logoutUrl: `/logout?email=${email}`});
});
app.get('/logout', function(req, res) {
    res.redirect('/');
});