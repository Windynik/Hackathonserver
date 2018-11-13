const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const {loginRoute,detectRoute,bookRoute,runRoute,linkRoute,langRoute} = require('./app/routes/index.js');
const app = express();


const dc = mongoose.connect('mongodb://localhost/test_databases',{ useNewUrlParser: true });
app.use(bodyParser.json({ extended: true , limit:'50mb'}));

app.get('/', (req, res) => {
    res.send("the big doggo")
    console.log("top kek");
})

app.use('/login',loginRoute);
app.use('/book',bookRoute);
app.use('/detect',detectRoute);
app.use('/run',runRoute);
app.use('/link',linkRoute);
app.use('/lang',langRoute);


app.listen(1337,()=>{
    console.log("this shits working bois");
})