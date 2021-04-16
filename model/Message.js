const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content:{
      type: String
    },
    platform:{
      type:String
    },
    user:{
      type:String
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model("Message", messageSchema);