import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { Media, MediaType, MediaGenre } from './entity/Media';

import "reflect-metadata";
import { createConnection } from "typeorm";
import { AnalyticsData } from './entity/AnalyticsData';
require("dotenv").config()

function randomEnum<T>(anEnum: T): T[keyof T] {
   const enumValues = Object.keys(anEnum)
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
   const randomIndex = Math.floor(Math.random() * enumValues.length)
   const randomEnumValue = enumValues[randomIndex]
   return randomEnumValue;
}

function shuffleArray<T>(array: T[]) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
}

console.log("Starting...")

// here you can start to work with your entities
// Load HTTP module
const http = require("http");

const app = express()
app.use(cors())
app.use(express.static('static'))

createConnection().then(connection => {
   const mediaRepository = connection.getRepository(Media)
   const analyticsRepository = connection.getRepository(AnalyticsData)

   const media1 = new Media()
   media1.genre = MediaGenre.GOOD
   media1.isAIMade = false
   media1.link = "https://img.buzzfeed.com/buzzfeed-static/static/2018-04/13/16/asset/buzzfeed-prod-web-08/sub-buzz-3730-1523651298-7.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"
   media1.type = MediaType.IMAGE
   mediaRepository.save(media1)

   const media2 = new Media()
   media2.genre = MediaGenre.GOOD
   media2.isAIMade = true
   media2.link = "https://img.buzzfeed.com/buzzfeed-static/static/2018-04/13/16/asset/buzzfeed-prod-web-08/sub-buzz-3730-1523651298-7.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"
   media2.type = MediaType.IMAGE
   mediaRepository.save(media2)

   const media3 = new Media()
   media3.genre = MediaGenre.BAD
   media3.isAIMade = false
   media3.link = "https://img.buzzfeed.com/buzzfeed-static/static/2018-04/13/16/asset/buzzfeed-prod-web-08/sub-buzz-3730-1523651298-7.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"
   media3.type = MediaType.IMAGE
   mediaRepository.save(media3)

   const media4 = new Media()
   media4.genre = MediaGenre.BAD
   media4.isAIMade = true
   media4.link = "https://img.buzzfeed.com/buzzfeed-static/static/2018-04/13/16/asset/buzzfeed-prod-web-08/sub-buzz-3730-1523651298-7.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"
   media4.type = MediaType.IMAGE
   mediaRepository.save(media4)

   console.log("Connected to database")
   app.get('/media', async (req, res) => {
      const randomGenre = randomEnum(MediaGenre)
      const humanMedia = await mediaRepository.find({
         where: { genre: randomGenre, isAIMade: false }
      })
      const aiMedia = await mediaRepository.find({
         where: { genre: randomGenre, isAIMade: true }
      })
      const artPieces = [aiMedia[Math.floor(Math.random() * aiMedia.length)], humanMedia[Math.floor(Math.random() * humanMedia.length)]]
      shuffleArray(artPieces)

      res.send({
         link1: artPieces[0].link,
         type1: artPieces[0].type,
         id1: artPieces[0].id,
         link2: artPieces[1].link,
         type2: artPieces[1].type,
         id2: artPieces[1].id
      })
   })

   // TODO save analytic information in DB
   app.get('/score', async (req, res) => {
      const selectedMedia = await mediaRepository.findOne(req.query.selectedId as string)
      const unselectedMedia = await mediaRepository.findOne(req.query.unselectedId as string)

      const analyticsData = new AnalyticsData()
      analyticsData.selectedMedia = selectedMedia
      analyticsData.unselectedMedia = unselectedMedia

      analyticsRepository.save(analyticsData)

      res.send(selectedMedia.isAIMade)
   })

   app.listen(process.env.PORT)

   console.log("Started on port " + process.env.PORT)

}).catch(error => console.log(error));

