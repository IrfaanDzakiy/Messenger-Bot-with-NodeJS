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
  var now = moment().toObject();
  var birth = {...birthday.toObject(), years:now.years}

  var a = moment(now);
  var b = moment(birth);

  var diff = b.diff(a, 'days');
  if ( diff >= 0){
    return diff
  }
  else{
    return 365+diff
  }
}

module.exports = {checkYes, checkNo, getDays}