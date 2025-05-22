import express from 'express'
import dotenv from 'dotenv'


function Mpesa() 
{
    dotenv.config()
    const consumerKey  = process.env.CONSUMERKEY
    console.log("this is the consumerKEY", consumerKey)
    const consumerSecret = process.env.CONSUMERSECRET
    const mpesa = express.Router()

   
    mpesa.post("/post", async (req, res) => {
        let accessToken;
        try {
          console.log("This is the consumer key", consumerSecret);
      
          // Get the access token first
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
          let headers = new Headers();
          console.log("this is auth", auth); // Log the auth string
          const authenticate = "Q1dlZ1ZwT2dSeHo3bU5ndTFPUTZ0allHRnNOcW4yQnFkdDB6eUxmR0FjcGxEV1VuOjhZNWZVOEdmd2lRT0ExSVh3NjE2eGl2a3haOXJPUXNjcHdoTW5mNFhmUjIxWnQ0NExBRlpvb2p1Q29sMWFQQk4=";
          headers.append("Authorization", `Basic ${authenticate}`);
      
          // Fetch the access token
          await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", { headers })
            .then(response => response.json())
            .then(async result => {
              accessToken = result.access_token; // Assign the access token
              console.log("Access Token:", accessToken);
      
              // Extract payload from the request
              const {
                Amount,
                PhoneNumber,
                Product
              } = req.body;
      
              // Make the STK Push request
              let stkHeaders = new Headers()
              stkHeaders.append("Content-Type", "application/json");
              stkHeaders.append("Authorization", `Bearer ${accessToken}`); // Corrected: Do not use JSON.stringify
      
              await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
                method: 'POST',
                headers: stkHeaders,
                body: JSON.stringify({
                  BusinessShortCode: 174379,
                  Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwMzE1MTgzNjIy",
                  Timestamp: "20250315183622",
                  TransactionType: "CustomerPayBillOnline",
                  Amount: Amount,
                  PartyA: 254759303717,
                  PartyB: 174379,
                  PhoneNumber: PhoneNumber,
                  CallBackURL: "https://mydomain.com/path",
                  AccountReference: "Bloo",
                  TransactionDesc: `Payment of ${Product}`
                })
              })
                .then(response => response.json())
                .then(result => {
                  console.log("Posted results:", result);
                  console.log("Current value of access token:", accessToken); // Log the access token
                  res.status(200).json({ message: "Posted", result });
                  console.log("STK Push Headers2:", headers);
                })
                .catch(error => {
                  console.log("Error in posting:", error);
                  res.status(500).json({ error: "Failed to initiate payment" });
                });
            })
            .catch(error => {
              console.log("Error fetching access token:", error);
              res.status(500).json({ error: "Failed to fetch access token" });
            });
        } catch (error) {
          console.error("STK push error:", error.message || error);
          res.status(500).json({ error: "Failed to initiate payment" });
        }
      });
      /* mpesa.post("/post", async (req, res) => {
        let accessToken;
        try {
          console.log("This is the consumer key", consumerSecret);
      
          // Get the access token first
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
          let headers = new Headers();
          console.log("this is auth", auth); // Log the auth string
          const authenticate = "Q1dlZ1ZwT2dSeHo3bU5ndTFPUTZ0allHRnNOcW4yQnFkdDB6eUxmR0FjcGxEV1VuOjhZNWZVOEdmd2lRT0ExSVh3NjE2eGl2a3haOXJPUXNjcHdoTW5mNFhmUjIxWnQ0NExBRlpvb2p1Q29sMWFQQk4=";
          headers.append("Authorization", `Basic ${authenticate}`);
      
          // Fetch the access token
          const tokenResponse = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", { headers });
          const tokenData = await tokenResponse.json();
          accessToken = tokenData.access_token; // Assign the access token
          console.log("Access Token:", accessToken);
      
          // Extract payload from the request
          const {
            BusinessShortCode,
            Password,
            Timestamp,
            TransactionType,
            Amount,
            PartyA,
            PartyB,
            PhoneNumber,
            CallBackURL,
            AccountReference,
            TransactionDesc
          } = req.body;
      
          // Make the STK Push request
          const stkHeaders = new Headers(); // Create new headers for the STK Push request
          stkHeaders.append("Content-Type", "application/json");
          stkHeaders.append("Authorization", `Bearer ${accessToken}`); // Corrected: Only use Bearer token
          console.log("STK Push Headers:", stkHeaders); // Log the headers
      
          const stkResponse = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            method: 'POST',
            headers: stkHeaders,
            body: JSON.stringify({
              BusinessShortCode: 174379,
              Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwMzE1MTgzNjIy",
              Timestamp: "20250315183622",
              TransactionType: "CustomerPayBillOnline",
              Amount: 1,
              PartyA: 254708374149,
              PartyB: 174379,
              PhoneNumber: 254759303717,
              CallBackURL: "https://mydomain.com/path",
              AccountReference: "CompanyXLTD",
              TransactionDesc: "Payment of X"
            })
          });
      
          const stkResult = await stkResponse.json();
          console.log("Posted results:", stkResult);
          console.log("Current value of access token:", accessToken); // Log the access token
          res.status(200).json({ message: "Posted", result: stkResult });
        } catch (error) {
          console.error("STK push error:", error.message || error);
          res.status(500).json({ error: "Failed to initiate payment" });
        }
      }); */

    return mpesa



}


export default Mpesa