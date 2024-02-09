const mongoose = require('mongoose')
const uri = "mongodb+srv://gianfrancodevettori:<St@cy1046>@nosql.iydplsy.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect('mongodb://127.0.0.1:27017/Socialmedia')

module.exports = mongoose.connection