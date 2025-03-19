const express = require("express");
const path = require("path");
const mysql2 = require("mysql2");
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();
const port = config.port;
const pool = mysql2.createPool(config.pool);

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error creating connection pool:", err.message);
    } else {
        console.log("Database connection pool created successfully");
        connection.release();
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'public/app/dist/frontend/browser')));

const apiRouter = require('./app/routes/api')(express, pool);
app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/app/dist/frontend/browser/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
