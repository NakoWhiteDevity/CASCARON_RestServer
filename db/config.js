const mongoose = require('mongoose');

const dbC = async() => {
    try{
        mongoose.connect('mongodb://localhost:27017/cafe',{
            user:'cafeuser',
            pass:'cafeuser',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos GUCCI');
    } catch (err) {
        console.log(err);
        throw new Error('No se establece la conexión');
    }
}

module.exports = {
    dbC
}