function getOTP(){
const otp = (Math.floor((Math.random()+1)*100000))
return otp
}
module.exports=getOTP