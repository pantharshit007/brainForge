const express = require('express')
const app = express()

//packages
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload");
const cors = require("cors");

//imports
const rootRouter = require('./routes/rootRouter')
const database = require('./config/database')
const cloudinary = require('./config/cloudinary')

require('dotenv').config()
const PORT = process.env.PORT || 3000
const FE_URL = process.env.FE_URL

const allowedOrigins = FE_URL.split(',').map(url => url.trim());

app.use(express.json());
app.use(cookieParser())
app.use(
    //only listen on this port for FE and postman
    cors({
        origin: function (origin, callback) {
            // Check if the origin is in the list of allowed origins
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        maxAge: 14400,
    })
)

// allowing files to be store at a temporary location
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

app.use('/api/v1', rootRouter)

app.get('/', (req, res) => {
    return res.json({
        msg: 'Hi Mom! ✨'
    })
})

app.listen(PORT, () => {
    console.log('> App is running on port: ' + PORT)
})

// Connect database to app
database.connect();

//connect cloudinary
cloudinary.cloudinaryConnect();
