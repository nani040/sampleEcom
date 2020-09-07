const express = require("express")
const app = express()
const mongodb = require("mongodb")
const config = require('./config').config
var bodyParser = require('body-parser')
app.use(bodyParser.json())

let dbConnection = require("./model/db").mongoDB;
let mongoOptions = {  
    autoReconnect:true,
    poolSize: 20,
    socketTimeoutMS: 4000,
    reconnectInterval: 1000,
    reconnectTries: Number.MAX_VALUE,
    keepAlive: 10000
}
let dbUrl = 'mongodb://'+config.mongoUser+':'+config.mongoPswd+'@'+config.mongoHost+':'+config.mongoPort+'/'+config.mongoDbname+'';
let db = new dbConnection(dbUrl,mongoOptions);


app.get('/', (req, res)=>{
    res.send("hello world!")
})

app.listen(config.port, ()=>{
    console.log("server is running on port: ",config.port);
    require('./routes')(app, db)
})