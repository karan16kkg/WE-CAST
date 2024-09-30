const express = require ("express");
const user = express();
const fs = require("fs");
const data = require("./data.json");
const { CreateError } = require("./Middleware/errors");

user.get("/signup",(req,res)=>{
    res.send(data);
})

user.post("/signup",(req,res,next)=>{
    let{name,email,password} = req.body;
    let database = data;
    let user={
        id : new Date().getTime(),
        name,
        email,
        password
    }

    let index = database.findIndex((ele)=>ele.email.toLowerCase() == email.toLowerCase());
    if(index>=0){
        next(CreateError(208,"User Already Exists"));
    }
    else{
        database.push(user);
        fs.writeFile("data.json",JSON.stringify(database),(err)=>{
            if(err){
                next(err);
            }
            else{
                res.send("user added successfully");
            }
        })
    }
})

module.exports = user;