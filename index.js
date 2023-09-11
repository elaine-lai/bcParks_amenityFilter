import express from 'express';
import path from 'path';

const app = express()

app.get('/', (req, res) => {
  // res.send('express vercel app response!')
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
