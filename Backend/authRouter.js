const express = require("express");
const login = express();
const data = require("./data.json");
const fs = require("fs")
const { CreateError } = require("./Middleware/errors");

login.get("/login",(req,res)=>{
    res.send("Hello");
})

login.post("/login",(req,res,next)=>{
    let{email,password} = req.body;
    let database = data;
    let index = database.findIndex((ele)=>ele.email.toLowerCase() == email.toLowerCase());
    if(index>=0){
        if(database[index].password == password){
            res.send("Login successfully");
        }
        else{
            next(CreateError(208,"Incorrect Password"));
        }
    }
    else{
        next(CreateError(404,"User Not Found"));
    }
})

login.post("/forgot",(req,res,next)=>{
    let {email,password,confirm} = req.body;
    let database = data;
    if(password == confirm){
        let index = database.findIndex((ele)=>ele.email == email);
        if(index>=0){
    
            database[index].password = password;
            fs.writeFile("data.json",JSON.stringify(database),(err)=>{
                if(err){
                    next(err);
                }
                else{
                    res.send("Password change successfully");
                }
            })
        }
        else{
            next(CreateError(404,"User Not Found"));
        }
    }
    else{
        next(CreateError(208,"Password Not Same"))
    }
})

module.exports = login;