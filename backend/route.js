const express = require("express");
const getRouter = new express.Router();
const postRouter = new express.Router();
const {allPostHandles,allGetHandles} = require("./controller.js");
const {feedbackSaveMiddleware} = require("./middleware.js");
let postControllers = new allPostHandles();
let getControllers = new allGetHandles();
// get route
getRouter.get('/',getControllers.getMainPageHandle.bind(getControllers));
getRouter.get('/ip-track-terms',getControllers.getTermConditionPageHandle.bind(getControllers));
getRouter.get('/ip-track-about',getControllers.getAboutPageHandle.bind(getControllers));
postRouter.post("/feedback",feedbackSaveMiddleware, postControllers.feedback.bind(postControllers));
module.exports = {
  getRouter,
  postRouter
};