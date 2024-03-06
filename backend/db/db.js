const mongoose = require("mongoose")
const mongoURI = 'mongodb+srv://nimble2905:' + encodeURIComponent('utsav@2905') + '@cluster0.wi8ghgi.mongodb.net/utsav?retryWrites=true&w=majority&ssl=true'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectToMongo;