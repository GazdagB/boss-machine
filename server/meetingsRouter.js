const express = require('express'); 
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');
const meetingsRouter = express.Router(); 

meetingsRouter.get("/",(req,res,next)=>{
    res.send(getAllFromDatabase("meetings"))
})

meetingsRouter.post("/",(req,res,next)=>{
    const meetingToAdd = createMeeting();
    const added = addToDatabase("meetings", meetingToAdd)
    
    if(added){
        res.status(201).send(added)
    }else{
        res.status(500)
    }
})

meetingsRouter.delete("/",(req,res,next)=>{
    const deleteAll = deleteAllFromDatabase("meetings");
    if(deleteAll){
        res.sendStatus(204);
    } else{
        res.sendStatus(404)
    }
})

module.exports = meetingsRouter; 