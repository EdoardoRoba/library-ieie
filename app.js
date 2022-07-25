const express = require('express')
const mongoose = require('mongoose')
const xlsx = require('xlsx')
const upload = require('express-fileupload')
const Book = require('./models/book')
// const bodyParser = require('body-parser')
require('dotenv').config();
var cors = require('cors')
const jwt = require("jsonwebtoken")
const app = express();
// const feUrl = "http://localhost:3000"
const feUrl = "https://mylibrary-herokuapp.herokuapp.com"
const port = process.env.PORT || 8050
// const idEmailAlert = '62086ab09422a5466157fe5a'
const path = require('path');

// COMMENT WHEN RUNNING LOCALLY
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

// app.use(bodyParser.json())

// COMMENT WHEN BUILDING TO HEROKU next 13 lines
// const whitelist = [feUrl]
// // enable CORS policy
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     },
//     credentials: true,
// }
// app.use(cors(corsOptions))

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb' }));
app.use(upload())

// Connect to server
const dbUri = process.env.MONGO_URL //'mongodb+srv://admin:bYn3epDI1YwiENB6@cluster0.61jsm.mongodb.net/warehouse?retryWrites=true&w=majority'
// console.log("dbUri: " + dbUri)
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected")
    app.listen(port)
}).catch((error) => { console.log(error) })


// STRUCTURE OF THE WAREHOUSE:
// POST
app.post('/api/book', (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        section: req.body.section
    })
    book.save().then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log("error:", error)
    })
})

// // GET
app.get('/api/book', (req, res) => {
    // it gets all the element in that document
    Book.find().then((result) => {
        res.send(result);
    }).catch((error) => { console.log("error: ", error) })
})

// //GET SINGLE
app.get('/api/book/:id', (req, res) => {
    // it gets all the element in that document
    Book.findById(req.params.id).then((result) => {
        res.send(result);
    }).catch((error) => { console.log("error: ", error) })
})

// // PUT
app.put('/api/book/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Book.findByIdAndUpdate(
        { _id: id },
        body
    ).then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log("error: ", error)
    })
})

// //DELETE
app.delete('/api/book/:id', (req, res) => {
    const id = req.params.id;
    Book.deleteOne(
        { _id: id }
    ).then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log("error: ", error)
    })
})


// COMMENT WHEN RUNNING LOCALLY
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});