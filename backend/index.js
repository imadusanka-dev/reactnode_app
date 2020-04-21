const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }), cors());
app.use(bodyParser.json());

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testapp'
});

connection.connect()

app.get('/user', (req, res) => {
    connection.query('SELECT * FROM users', (err, result, fields)=>{
        if (err) throw err;
        res.send(result);
    })
});

app.post('/user', (req, res) => {
    connection.query(`INSERT INTO users VALUES('${req.body.name}', '${req.body.nic}', '${req.body.gender}')`,
        (err, rows, fields) => {
            if(err) throw err;
        })
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))