const app = require('express')();
const http = require('http').Server(app);

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://8700suraj:21hJIFETV1vdRFDL@testt-db.5igjwzu.mongodb.net/task-manager"); //COMPASS


http.listen(4000, function(){
    console.log('Server is working now');
});

