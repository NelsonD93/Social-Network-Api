const express = require('express')
const connection = require('./config/connection');
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(require('./routes'))

connection.once('open',()=>{
    app.listen(3001,()=>{
        console.log('Listening at port 3001')
    }) 
})