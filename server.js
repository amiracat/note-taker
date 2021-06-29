//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

//using local port 3011
const PORT = process.env.PORT || 3011;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));


const {
    v4: uuidv4
} = require('uuid');

let noteArray = [{
    "title": "Test Title",
    "text": "Test text"
}];
fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));

// app.get('/notes', function (req, res) {
//     fs.readFile(`./public/notes.html`, (err, data) => {
//         if (err) throw err;
//         res.end(data);
//     });
// });

app.get('/api/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    res.json(data);
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    // Assigning unique id from 'uuid' package
    newNote.id = uuidv4();
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(data);
});

//could add app.delete request here with id

app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
});