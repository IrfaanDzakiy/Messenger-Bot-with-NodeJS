const {Router} = require('express')
const mongoose = require('mongoose')
const Message = mongoose.model('Message')

const messageRouter = Router()

messageRouter.get('/messages', async (req, res) =>{
  console.log("Get messages history");
  const message = await Message.find({});

  res.status(200).json(message);
})

messageRouter.get('/messages/:id', async (req, res) =>{
  console.log("Get messages history by id")
  var id = mongoose.Types.ObjectId(req.params.id)
  console.log(id)
  const message = await Message.findById(id);

  res.status(200).json({data : message});
})

messageRouter.delete('/messages/:id', async (req, res) =>{
  console.log("Delete Messages")
  var id = mongoose.Types.ObjectId(req.params.id)
  const message = await Message.deleteOne({_id:id})

  res.status(200).json({data: message});
})

module.exports = messageRouter