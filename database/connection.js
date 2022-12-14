
const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/articles");


const connectDB = async () => {
    try {
        // mongodb connection string
        const con = await mongoose.connect("mongodb://localhost:27017/articles", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB