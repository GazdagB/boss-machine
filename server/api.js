const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./minionsRouter');
const meetingsRouter = require('./meetingsRouter');
const ideasRouter = require('./ideasRouter'); 

apiRouter.use("/minions", minionRouter);
apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/meetings",meetingsRouter);

module.exports = apiRouter;
