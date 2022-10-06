const express = require('express')
const app = express()
const port = 5000
const connection = require('./database/connection')
const morgan=require('morgan')
connection();

// log requests
app.use(morgan('tiny'));

app.use(express.json())
const articlesRoutes = require('./routes/article')
app.use('/api/articles/', articlesRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))