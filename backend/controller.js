const {AutoIpSchema, FeedbackShema} = require("./model.js");
// get controls
let msg;
class allGetHandles {
  contractor(req , res) {
    this.req = req;
    this.res = res;
  }
  getMainPageHandle(req , res) {
    try {
    res.render("Main");
    } catch (error) {
      console.log("Main getting err", error);
      res.status(500).send("Server side error 500");
    }
  }
  getTermConditionPageHandle(req , res) {
    try {
    res.render("Terms");
    } catch (error) {
      console.log("Term getting err", error);
      res.status(500).send("Server side error 500");
    }
  }
  getAboutPageHandle(req , res) {
    try {
    res.render("About");
    } catch (error) {
      console.log("about getting err", error);
      res.status(500).send("Server side error 500");
    }
  }
}
// post controls 
class allPostHandles{
  contractor(req, res) {
    this.req = req;
    this.res = res;
  }
async  feedback(req,res) {
  try {
    let {username, feedback, issue} = req.body;
    FeedbackShema.create({
      name:username,
      experience:feedback,
      issues:issue
    });
    msg = "THANKYOU FOR YOUR FEEDBACK";
    res.render("Main", {msg:msg});
    } catch (e) {
      console.log("Feedback post err", e);
     msg = "Server side error feedback is not submitted please try again later 😕";
      res.render('Main', {msg:msg});
    }
  }
}
module.exports = {
  allPostHandles, 
  allGetHandles
};