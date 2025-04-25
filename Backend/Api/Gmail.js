import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


function Gmail()
{
  const gmail = express.Router()
  dotenv.config()
  const password = process.env.PASSWORD
  console.log("this is the password", password)
  gmail.use(bodyParser.json())
  const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com", 
    port:465, 
    secure:true, 
    auth: 
    {
      user:"kelicaleb7@gmail.com", 
      pass:password
    }
  })
  
gmail.post("/posts", async (req, res) => 
{
  try{
    const{to, subject, text, html} = req.body 
    const send = {
      from:"Bloo", 
      to,
      subject, 
      text, 
      html
    }
    const bind = await transporter.sendMail(send)
    return res.status(200).json(bind)
  } 
  catch{
    console.log("Error posting data to gmail")
    return res.status(500).json({message:"Error posting data to gmail"})
  } 
})



  return gmail
}

export default Gmail