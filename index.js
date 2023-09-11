import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import allParksFile from './bcparksRegionAmenities/allparks.json' assert { type: "json" };


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


app.get('/api/users', (req, res) => {
  res.json(allParksFile)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
