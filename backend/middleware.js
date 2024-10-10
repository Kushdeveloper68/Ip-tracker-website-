const ipinfo = require("ipinfo");
const {AutoIpSchema, FeedbackShema} = require("./model.js");
let msg;
async function ipGettingAndSave(req , res , next) {
  ipinfo((e , dta) => {
    if(e) {
      console.log(e, "ipinfo err");
      next();
    } else  {
      AutoIpSchema.create({
        ip:dta.ip,
        city:dta.city,
        region:dta.region,
        country:dta.country,
        loc:dta.loc,
        org:dta.org,
        postal:dta.postal,
        timezone:dta.timezone
      });
      next();
    }
  });
}
async function feedbackSaveMiddleware(req , res , next) {
  let {username, feedback, issue} = req.body;
  if(!username || !feedback || !issue) {
    msg = "please fill the form";
    res.render("Main", {msg:msg});
  } else {
    next();
  }
}
module.exports = {
  ipGettingAndSave,
  feedbackSaveMiddleware
};