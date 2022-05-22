const express = require('express')
const app = express()
const port = 3001
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.json());

app.post('/hello', 
() => {
    console.log("hi"); 
    next()
},(req, res) => {
    console.log(req.body)
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Note taker now listening on port ${port}`)
})