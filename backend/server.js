var mongoose = require('mongoose');
const express = require('express')
const dotenv = require('dotenv')
var app = express();

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true ,useUnifiedTopology: true,  useCreateIndex: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', ()=>console.log("connected"))


app.use(express.json());

app.listen(3000, ()=>console.log('server started'))
