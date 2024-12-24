const express = require('express'); 
const { getFromDatabaseById, addToDatabase, getAllFromDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

const workRouter = express.Router(); 

//Checks if the workId is valid
workRouter.param('workId',(req,res,next,id)=>{
    const workId = id
   
    if(getFromDatabaseById("work",workId)){
        req.workId = workId; 
        next();
    } else{
        const err = new Error("The work you are looking for dosen't exists")
        err.status = 404; 
        next(err); 
    }
})

workRouter.get('/', (req,res,next)=>{
    const allWork = getAllFromDatabase('work',req.minionId);
    const thisMinionsWork = allWork.filter((work)=>{
        return work.minionId === req.minionId})
    res.send(thisMinionsWork); 
})

workRouter.post('/',(req,res,next)=>{
    const newWork = req.body;
    res.status(201).send(addToDatabase('work',newWork))
})

workRouter.put('/:workId',(req,res,next)=>{
    let update = req.body; 
    update = {id: req.workId, ...update}

    try {
        res.send(updateInstanceInDatabase('work',update))
    } catch (error) {
        res.status(400); 
        next(error)
    }

    
})

workRouter.delete('/:workId',(req,res,next)=>{
    const isDeleted = deleteFromDatabasebyId("work",req.workId);
    if(isDeleted){
        res.sendStatus(204); 
    } else{
        res.sendStatus(400); 
    }
})

module.exports = workRouter