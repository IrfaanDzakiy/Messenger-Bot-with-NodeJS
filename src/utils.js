const moment = require('moment');

const YES = ["Yes", "yes", "Yeah", "yeah", "Yup", "yup"]
const NO = ["No", "no", "Nah", "nah", "Nope", "nope"]

const checkYes = (s) => {
  return YES.includes(s);
}

const checkNo = (s) => {
  return NO.includes(s);
}

const getDays = (birthday) =>{
  console.log("in get days")
  var now = moment().toObject();
  var birth = {...birthday, years:now.years}

  var a = moment(now);
  var b = moment(birth);

  var diff = b.diff(a, 'days', true);
  if ( diff >= 0){
    return Math.ceil(diff)
  }
  else{
    return 365+Math.ceil(diff)
  }
}

module.exports = {checkYes, checkNo, getDays}