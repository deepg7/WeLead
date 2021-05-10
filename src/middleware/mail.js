const nodemailer = require('nodemailer')
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });


function mail(to,subject,output){
 let transporter = nodemailer.createTransport({
  service:"gmail",  
  auth: {
      user: process.env.email, 
      pass: process.env.password  
  },
  tls:{
    rejectUnauthorized:false
  }
});

let mailOptions = {
    from: process.env.email, 
    to: to, 
    subject: subject, 
    html:output
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
  

   
});
}
const output =`<h2>Kudos to you for taking the initiative and reaching out to us to join the march to help everyone who has been suffering in these severe times.</h2> 
<br><h3>Your OTP is: xxxxxx</h3><br>
<h2>We are grateful for your support and wish for the healthy living of everyone around.</h2>
<br>
<h3>Regards,<br> 
Team weLead.

This is Me Deep phone shut down ill come back online soon
</h3>`

module.exports=mail