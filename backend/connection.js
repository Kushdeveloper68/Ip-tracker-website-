const mongoose = require("mongoose");
async function mongooseConnection(url) {
  await mongoose.connect(url);
}
module.exports = {mongooseConnection};
