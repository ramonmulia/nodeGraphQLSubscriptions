const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/events';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, (err) => {
    if(err){
        console.error(err);
    }
});

const connection = mongoose.connection;

connection.on('close', () => {
    console.log('CONNECTION CLOSED!');
    process.exit(0);
});



module.exports = mongoose;



