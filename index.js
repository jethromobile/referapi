var http = require('http');
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_API_KEY });

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/refer", async function (req, res) {
    const country = req.body.data.country
    const email = req.body.data.email;
    const phone = req.body.data.phone;
    const apikey = req.body.data.apikey;


    var newDate = new Date(new Date().getTime()+(15*24*60*60*1000));
    // newDate time to midnight UTC
    newDate.setUTCHours(0,0,0,0);
    newDate = newDate.toISOString();
    



   const description =
     "Friends email: " +
     email +
     "\nCustomers phone number: " +
     phone +
     "\nCustomers country: " +
     country;

    const owener = process.env.TICKET_OWNER_ID.toString();




    const ticket = await hubspotClient.crm.tickets.basicApi.create({
      properties: {
        hs_pipeline: "23975565",
        hs_pipeline_stage: "56385545",
        hs_ticket_priority: "HIGH",
        subject: "New referral",
        hubspot_owner_id: owener,
        reminder: newDate,
        content: description,
        email: email,
      },
    });
    res.send("success");







    

});


app.post("/refer/jp", async function (req, res) {
  const email = req.body.data.email;
  const phone = req.body.data.phone;


  var newDate = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000);
  // newDate time to midnight UTC
  newDate.setUTCHours(0, 0, 0, 0);
  newDate = newDate.toISOString();

  const description =
    "Friends email: " +
    email +
    "\nCustomers phone number: " +
    phone;

  const jpowener = process.env.JP_TICKET_OWNER_ID.toString();

  const ticket = await hubspotClient.crm.tickets.basicApi.create({
    properties: {
      hs_pipeline: "24828766",
      hs_pipeline_stage: "57673843",
      hs_ticket_priority: "HIGH",
      subject: "New referral",
      hubspot_owner_id: jpowener,
      reminder: newDate,
      content: description,
      email: email,
    },
  });
  res.send("success");
});









app.listen(process.env.PORT || 3000);