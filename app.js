const express = require('express');
const app = express();
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./api/routes/user');
// const intrestRoute = require('./api/routes/intrest');
const { errorHandler } = require('./api/middleware/errorMiddleware');
// const loginRoute = require('./api/routes/login');
// const basicprofileRoute = require('./api/routes/basicprofile');


mongoose.connect('mongodb+srv://wander:Appleapple1829@cluster0.hrpur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


mongoose.connection.on('error',err=>{
    console.log('connection fail')
});

mongoose.connection.on('connected',connected=>{
    console.log('connection success full')
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// app.use(notFound);
app.use(errorHandler);
app.use('/uploads', express.static('uploads'))
app.use('/user',userRoute);
// app.use('/intrest',intrestRoute);
// app.use('/login',loginRoute);
// app.use('/basicprofile',basicprofileRoute);



app.use((req,res,next)=>{
res.status(200).json({
    message:'app is running'
});
});

module.exports =app;