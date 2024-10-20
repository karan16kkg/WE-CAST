const express = require("express");
const app = express();
const cors = require("cors");
const { ErrorHandler } = require("./Middleware/errors");
const login = require("./authRouter");
const user = require("./userRoute");
const api = require("./api");
const port = 3000;

app.use(express.urlencoded ({extended:false}))
app.use(cors())
app.use(express.json())
app.use('/user',user)
app.use("/user",login)
app.use("/api",api)
// app.get("/",(req,res)=>{
//     res.send("Hello");
// })

app.use(ErrorHandler)

app.listen(port,()=>{
    console.log(`Server is runnin on port:${port}`);
})