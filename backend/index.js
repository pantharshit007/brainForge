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

app.use(express.json());
app.use(cookieParser())
// app.use(
//     //only listen on this port for FE and postman
//     cors({
//         origin: FE_URL,
//         credentials: true,
//     })
// )

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
