const express = require('express')
const connectToDatabase = require('./config/dbConnect')
const cors = require("cors");


const app = express()
app.use(cors()); 
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: true }));


 
//---------Routes-------------
app.use("/user", require("./routes/userRoutes"));
app.use("/driver", require("./routes/driverRoutes"));
app.use("/admin", require("./routes/adminRoutes"));



connectToDatabase()
app.listen(4000, () => {
    console.log("server running port 4000....");
});

