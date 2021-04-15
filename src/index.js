const moment = require('moment');
const {checkYes, checkNo, getDays} = require('./utils')

async function Greet(context){
  await context.sendText("Hi i'm Agus, your personal birthday bot! ")
  await context.sendText(`I want to ask a few questions if you don't mind :)`)
  await context.sendText('What is your name?')
  context.setState({
    status:1
  })
}

async function getName(context){
  if(context.event.isText){
    context.setState({
      status: 2
    })
    await context.sendText(`Hi ${context.event.text}!`)
    await context.sendText('What is your birthday?')
  }
  else{
    await context.sendText('I am sorry, i can only understand text :(.')
  }
}

async function getBirthday(context){
  if (
    context.event.isText &&
    moment(context.event.text, 'YYYY-M-D', true).isValid()
  ) {
    var birthday = moment(context.event.text, 'YYYY-MM-DD');
    await context.sendText(`Oh so you're born in ${birthday.format('MMMM Do YYYY')}`)
    await context.sendText('Do you want to know when is your next birthday?',{
      quickReplies : [
        {
          contentType: 'text',
          title: 'Yes please!',
          payload: 'Yes'
        },
        {
          contentType: 'text',
          title: 'No thank you',
          payload: 'No'
        }
      ]
    })

    context.setState({
      status :3,
      birthday: birthday
    })
  }
  else{
    await context.sendText('Quite the joker are you :D')
    await context.sendText(`Please send your real birthday in 'YYYY-MM-DD' format :)`)
  }
}

async function giveNextBirthday(context){
  var resp = null
  if(context.event.isText){
    resp = context.event.text;
  }
  if(context.event.isPayload){
    resp = context.event.quickReply.payload;
  }

  if(checkYes(resp)){
    var diff = getDays(context.state.birthday);
    await context.sendText(`There are ${diff} days left until your next birthday`)
    await context.sendText("Thank you for using my services :). Goodbye!")
    context.setState({
      status : 0,
      birthday : null
    })
  }
  else if(checkNo(resp)){
    await context.sendText("Thank you for using my services :). Goodbye!")
    context.setState({
      status : 0,
      birthday : null
    })
  }
  else{
    await context.sendText("I am sorry, I kind of missed that")
    await context.sendText('Do you want to know when is your next birthday?',{
      quickReplies : [
        {
          contentType: 'text',
          title: 'Yes please!',
          payload: 'Yes'
        },
        {
          contentType: 'text',
          title: 'No thank you',
          payload: 'No'
        }
      ]
    })
  }
}


module.exports = async function App(context){
  console.log(context.event)
  console.log(context.session)
  if(context.state.status === 0){
    return Greet
  }
  if(context.state.status === 1){
    return getName
  }
  if(context.state.status === 2){
    return getBirthday
  }
  if(context.state.status === 3){
    return giveNextBirthday
  }
}

