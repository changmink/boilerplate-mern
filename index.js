const express = require('express')
const app = express()
const port = 50000
const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.mongodb_url,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log('MongoDB Error:', err))

app.get('/', (req, res) => res.send('Hello world'))


app.listen(port, ()=>console.log(`listen ${port}`))