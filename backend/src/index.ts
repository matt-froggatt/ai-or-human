import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { Media, MediaType, MediaGenre } from './entity/Media';

import "reflect-metadata";
import { createConnection } from "typeorm";

console.log("Starting...")

// here you can start to work with your entities
// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

const app = express()
app.use(cors())
app.use(express.static('build'))


createConnection({
   type: "mysql",
   host: "localhost",
   port: 3306,
   username: "root",
   password: "test",
   database: "test",
   entities: [Media],
   synchronize: true,
   logging: false
}).then(connection => {
   const mediaRepository = connection.getRepository(Media)

   console.log("Connected to database")

   // TODO actually pull data (need to put data in DB and delete existing info)
   app.get('/media', async (req, res) => {
      console.log(await mediaRepository.count())
      res.send({
         link1: "https://i.ytimg.com/vi/W97Hztb6_5I/maxresdefault.jpg",
         type1: "image",
         id1: "1",
         link2: "https://i.ytimg.com/vi/W97Hztb6_5I/maxresdefault.jpg",
         type2: "image",
         id2: "2"
      })
   })

   // TODO save analytic information in DB
   app.get('/score', (req, res) => {
      res.send(req.query.id === "2")
   })

   app.listen(port)

   console.log("Started on port " + port)

}).catch(error => console.log(error));

