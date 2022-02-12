require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ message: "Hello" });
});

const DB_USER =  process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.eopie.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log("MongoBD Connected!");
        app.listen(3000);
    })
    .catch((err) => console.log(err));
