const express = require("express");
const api = express();

api.post("/",async(req,res)=>{
    let {city} = req.body;
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a322d39c25aa93e12bfe3ff1a6c68891`)
        const data = await response.json();
        // let x = data.list[0];
        // console.log(x);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = api