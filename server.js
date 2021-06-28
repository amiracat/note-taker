const express = require('express');
//const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

let noteArray = [{
    "title": "Test Title",
    "text": "Test text"
}];

//const noteArray = fs.readFile from db.json and store in an array
fs.writeFileSync(`./db/db.json`, JSON.stringify(noteArray));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));



//html routes

app.get(`/api/notes`, (req, res) => {
    let rawdata = fs.readFileSync(`./db/db.json`);

    res.end(rawdata);
})

app.get(`./assets/css/styles.css`, function (req, res) {
    fs.readFile(`./public/assets/css/styles.css`, (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.get(`./assets/js/index.js`, function (req, res) {
    fs.readFile(`./public/assets/js/index.js`, (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.get('*', function (req, res) {
    fs.readFile(`./public/index.html`, (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.post('/api/notes', function (req, res) {
    const newNote = req.body;

    let data = fs.readFileSync(`./db/db.json`, (err, data) => {
        if (err) throw err;
        return data;
    });
    data = JSON.parse(data);
    data.push(newNote)
    fs.writeFileSync(`./db/db.json`, JSON.stringify(data));
    return res.json(data)
});

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));