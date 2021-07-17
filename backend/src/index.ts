import express from 'express'

// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

const app = express()

app.get('/media', (req, res) => {
    res.send("https://i.kym-cdn.com/entries/icons/original/000/030/873/Screenshot_20.jpg")
  })
app.use(express.static('build'))

app.listen(port)
