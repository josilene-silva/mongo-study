require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Person = require('./models/Person');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.post('/person', async (req, res) => {
    const { name, salary, approved } = req.body;

    if (!name) return res.status(422).json({ message: 'Name is required' });

    const person = { name, salary, approved };

    try {
        await Person.create(person);

        return res.status(201).json({ message: "Person entered successfully" });

    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

app.get('/person', async (req, res) => {
    try {
        const person = await Person.find();
        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

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
