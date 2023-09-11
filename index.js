import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname)

app.get('/', (req, res) => {
  // res.send('express vercel app response!')
  res.sendFile(path.join(__dirname, '/index.html'))
})

//middleware so can access images and css 
app.use(express.static('public'));

var allParksFile = require('../bcparksRegionAmenities/allparks.json')

app.get('/api/users', (req, res) => {
  res.json(allParksFile)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
