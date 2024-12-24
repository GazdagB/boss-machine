const express = require('express');
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require("./db");
const workRouter = require('./workRouter');

const minionRouter = express.Router(); 

minionRouter.use('/:minionId/work', workRouter)

minionRouter.param("minionId",(req,res,next,id)=>{
    const minionId = id
   
    if(getFromDatabaseById("minions",minionId)){
        req.minionId = minionId; 
        next();
    } else{
        const err = new Error("The minion you are looking for dosen't exists")
        err.status = 404; 
        next(err); 
    }
})

minionRouter.get("/",(req,res,next)=>{
    res.send(getAllFromDatabase("minions"))
})

minionRouter.post("/", (req,res,next)=>{
    const newMinion = req.body; 
    res.status(201).send(addToDatabase('minions',newMinion))
})

minionRouter.get("/:minionId",(req,res,next)=>{
    res.send(getFromDatabaseById("minions",req.minionId))
})

minionRouter.put("/:minionId",(req,res,next)=>{
    let minionToUpdate = getFromDatabaseById("minions",req.minionId); 
    minionToUpdate = { ...minionToUpdate, ...req.body };
    
    res.send(updateInstanceInDatabase("minions",minionToUpdate))
})

minionRouter.delete("/:minionId", (req,res,next)=>{
    const minionToDelete = deleteFromDatabasebyId("minions",req.minionId); 
    if(minionToDelete){
        res.sendStatus(204)
    } else{
        res.status(404).send("Couldn't delete minion")
    }
    
})


module.exports = minionRouter