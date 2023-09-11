import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import allParksFile from './public/data/allparks.json';

// console.log(allParksFile)
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
  // res.send('express vercel app response!')
  res.sendFile(path.join(__dirname, '/index.html'))
})

//middleware so can access images and css 
// app.use(express.static('public')); //LOCAL USE
app.use(express.static(__dirname + "/public/")); //VERCEL USE


app.get('/api/users', (req, res) => {
  const campsites = [
    {
      area: 'Coastal Mainland',
      campground: 'Alice Lake',
      subcampground: ' Walk-In ',
      amenities: [
        ' Swimming ',     ' Parking ',
        ' Hiking ',       ' Boat Launch ',
        ' Day Use Area ', ' Beach ',
        ' Dog Beach ',    ' Information ',
        ' Dump Station ', ' Restroom ',
        ' No Dogs ',      ' No Fishing ',
        ' Water Tap '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: 'Alice Lake',
      subcampground: 'B (Sites 56-96)',
      amenities: [
      ' Parking ',
      ' Hiking ',
      ' Entrance Kiosk ',
      ' Information ',
      ' Restroom ',
      ' Restroom with Showers ',
      ' Swimming ',
      ' Playground ',
      ' Camping ',
      ' Walk-in Camping ',
      ' No Dogs ',
      ' No Cars '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Birkenhead Lake ',
      subcampground: 'null',
      amenities: [
        ' Swimming ',     ' Parking ',
        ' Hiking ',       ' Boat Launch ',
        ' Day Use Area ', ' Beach ',
        ' Dog Beach ',    ' Information ',
        ' Dump Station ', ' Restroom ',
        ' No Dogs ',      ' No Fishing ',
        ' Water Tap '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' S⨱ótsaqel / Chilliwack Lake ',
      subcampground: ' Flora Loop ',
      amenities: [
        ' Hiking ',
        ' Mountain Biking ',
        ' Horseback Riding ',
        ' Swimming ',
        ' Day Use Area ',
        ' Boat Launch ',
        ' Group Camping ',
        ' Camping ',
        ' Parking ',
        ' Group Camping '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' S⨱ótsaqel / Chilliwack Lake ',
      subcampground: 'Paleface Loop',
      amenities: [ ' Restroom ', ' Fishing ', ' Swimming ', ' Water Tap ' ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Cultus Lake ',
      subcampground: ' Maple Bay ',
      amenities: [
        ' Group Camping ',
        ' Camping ',
        ' Hiking ',
        ' Parking ',
        ' Swimming ',
        ' Restroom ',
        ' Lookout ',
        ' Information ',
        ' Day Use Area ',
        ' Entrance Kiosk ',
        ' Park Office ',
        ' Boat Launch ',
        ' Dump Station ',
        ' Biking ',
        ' Horseback Riding ',
        ' Fish Cleaning Station '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Golden Ears ',
      subcampground: ' North Beach ',
      amenities: [
        ' Group Camping ',
        ' Camping ',
        ' Hiking ',
        ' Parking ',
        ' Swimming ',
        ' Restroom ',
        ' Lookout ',
        ' Information ',
        ' Day Use Area ',
        ' Entrance Kiosk ',
        ' Park Office ',
        ' Boat Launch ',
        ' Dump Station ',
        ' Biking ',
        ' Horseback Riding ',
        ' Fish Cleaning Station '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Inland Lake ',
      subcampground: 'Campground',
      amenities: [
        ' Parking ',
        ' Restroom ',
        ' Garbage ',
        ' Park Office ',
        ' Water Tap ',
        ' Accessible '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Nairn Falls ',
      subcampground: 'null',
      amenities: [
        ' Parking ',
        ' Hiking ',
        ' Information ',
        ' Day Use Area ',
        ' Lookout ',
        ' Restroom ',
        ' Water Tap ',
        ' Accessible '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Porpoise Bay ',
      subcampground: 'Campground',
      amenities: [
        ' Parking ',
        ' Campfire Circle ',
        ' Recycling ',
        ' Garbage ',
        ' Restroom ',
        ' Restroom with Showers ',
        ' Information ',
        ' Play Field ',
        ' Water Tap ',
        ' Accessible '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Rolley Lake ',
      subcampground: 'Campground',
      amenities: [
        ' Waterfall ',
        ' Hiking ',
        ' Fishing ',
        ' Information ',
        ' Restroom ',
        ' Restroom with Showers ',
        ' Playground ',
        ' Water Tap ',
        ' No Swimming '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Saltery Bay ',
      subcampground: 'Campground',
      amenities: [
        ' Accessible ',
        ' Information ',
        ' Dump Station ',
        ' Hiking ',
        ' Restroom ',
        ' Garbage ',
        ' Change House ',
        ' Parking ',
        ' Day Use Area ',
        ' Water Tap '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Silver Lake ',
      subcampground: 'null',
      amenities: [
        ' Information ',
        ' Garbage ',
        ' Recycling ',
        ' Firewood ',
        ' Restroom ',
        ' Parking ',
        ' Day Use Area ',
        ' Boat Launch ',
        ' Fishing ',
        ' Water Tap ',
        ' Accessible '
      ]
    },
    {
      area: 'Coastal Mainland',
      campground: ' Sasquatch ',
      subcampground: ' Lakeside Campground ',
      amenities: [
        ' Entrance Kiosk ',
        ' Parking ',
        ' Restroom ',
        ' Playground ',
        ' Dump Station ',
        ' Day Use Area ',
        ' Beach ',
        ' Boat Launch ',
        ' Fishing ',
        ' Swimming '
      ]
    }
  ];
  res.json(campsites)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
