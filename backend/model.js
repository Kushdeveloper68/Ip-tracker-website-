const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const autoIpSchema = new Schema({
  ip:{type:String, },
  city:{type:String},
  region:{type:String},
  country:{type:String},
  loc:{type:String},
  org: {type:String},
  postal: {type:String},
  timezone: {type:String}
  
});
const feedbackShema = new Schema({
  name:{
    type:String,
    required:true
  } ,
  experience:{
    type:String,
    required:true
  },
  issues: {
    type:String,
  }
});
const AutoIpSchema = mongoose.model("VisitedIp",autoIpSchema);
const FeedbackShema = mongoose.model("Feedback", feedbackShema);
module.exports = {
  AutoIpSchema,
  FeedbackShema
};