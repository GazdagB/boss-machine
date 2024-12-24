const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideasRouter = express.Router(); 

ideasRouter.get("/",(req,res,next)=>{
res.send(getAllFromDatabase("ideas"));
})

ideasRouter.param('ideaId',(req,res,next,id)=>{
    
    if(getFromDatabaseById("ideas", id)){
        req.ideaId = id; 
        next();
    } else{
        const err = new Error("Can't find idea")
        err.status = 404; 
        next(err); 
    }
})

ideasRouter.post("/", checkMillionDollarIdea, (req,res,next)=>{
    const newIdea = req.body; 
    res.status(201).send(addToDatabase("ideas",newIdea))
})

ideasRouter.get("/:ideaId",(req,res,next)=>{
    res.send(getFromDatabaseById("ideas",req.ideaId))
})

ideasRouter.put("/:ideaId",(req,res,next)=>{
    const update = req.body;
    res.send(updateInstanceInDatabase("ideas",update)); 
})

ideasRouter.delete("/:ideaId", (req,res,next)=>{
    const deleted = deleteFromDatabasebyId("ideas", req.ideaId); 
    if(deleted){
        res.sendStatus(204); 
    } else{
        res.sendStatus(400); 
    }
})

module.exports = ideasRouter