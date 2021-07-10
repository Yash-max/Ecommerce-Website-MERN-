const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ygxm6.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('DataBase Connected');
});

/*app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello from server'
    });
});*/
// mongodb+srv://root:<password>@cluster0.fykr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.use(bodyParser());

app.use('/api', userRoutes);
app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`);
}); 