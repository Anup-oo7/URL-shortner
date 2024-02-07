import nodemailer from 'nodemailer'


/////////////////////////////////////////  OTP GENERATING //////////////////
export const generateOtp = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randomVal = Math.round(Math.random() * 9);
    otp = otp + randomVal;
  }
  return otp;
};

/////////////////////// E-MAIL TRANSPORTER ////////////////////

export const mailTransport = () => nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    },
  });

/////////////////////////////////////// E-MAIL TEMPLATE FOR OTP VERIFICATION////////////////////////

export const generateEmailTemplate = code =>{
    return `
    <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset some default styles */
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
    }

    /* Set a background color */
    body {
      background-color: #f0f0f0;
    }

    /* Center the email content */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }

    /* Style the header */
    .header {
      background-color: #3498db;
      color: #ffffff;
      padding: 20px;
    }

    /* Style the main content */
    .content {
      padding: 20px;
    }

    /* Style the call-to-action button */
    .cta-button {
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      display: inline-block;
    }

  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>URL shortner verification</h1>
    </div>
    <div class="content">
      <p>Hello, This is a verification email from URL shortner account.</p>
      <p>Please verify your email to continue</p>
      <p>Your verification code is</p>
      <p><b>${code}</b></p>
      
    
    </div>
  </div>
</body>
</html>
`
}


/////////////////////////////////////// E-MAIL TEMPLATE FOR SUCCESSFULL OTP VERIFICATION////////////////////////


export const plainEmailTemplate = (heading, message) =>{
    return `
    <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset some default styles */
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
    }

    /* Set a background color */
    body {
      background-color: #f0f0f0;
    }

    /* Center the email content */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }

    /* Style the header */
    .header {
      background-color: #3498db;
      color: #ffffff;
      padding: 20px;
    }

    /* Style the main content */
    .content {
      padding: 20px;
    }

    /* Style the call-to-action button */
    .cta-button {
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      display: inline-block;
    }

  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>URL shortner verification</h1>
    </div>
    <div class="content">
      <p>${heading}</p>
      <p>${message}</p>
      
      
    
    </div>
  </div>
</body>
</html>
`
}

