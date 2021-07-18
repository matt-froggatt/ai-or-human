import express from 'express'
import cors from 'cors'

// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

const app = express()

app.use(cors())
app.get('/media', (req, res) => {
   res.send({ 
      link1: "https://i.ytimg.com/vi/W97Hztb6_5I/maxresdefault.jpg", 
      type1: "image", 
      link2: "https://i.ytimg.com/vi/W97Hztb6_5I/maxresdefault.jpg", 
      type2: "image" 
   })
})
app.use(express.static('build'))

app.listen(port)
