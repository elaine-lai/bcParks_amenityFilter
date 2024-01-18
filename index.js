import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import jsonData from './bcparksRegionAmenities/allparks.js'


const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
  // res.send('express vercel app response!')
  res.sendFile(path.join(__dirname, '/index.html'))
})

//middleware, tells express module that the public dir has all of the site assets (images/css)
// app.use(express.static('public')); //LOCAL USE
app.use(express.static(__dirname + "/public/")); //VERCEL USE


app.get('/api/amenities', (req, res) => {
  res.json(jsonData)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
