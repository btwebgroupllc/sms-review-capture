const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 88;
const path = require("path");

const admin = require("firebase-admin");

const serviceAccount = require("./sms-review-capture-firebase-adminsdk-hxlhe-f2060b0799.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const accountToken = process.env.ACCOUNT_TOKEN;

const client = require("twilio")(accountSid, accountToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { response } = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("index", { phoneNumber: "123" });
});

app.post("/new-campaign", async (req, res) => {
  const tempPhoneNums = [];
  const responseString = "responseString";
  const responseText = "responseText";
  console.log(req.body.phoneNumber);
  tempPhoneNums.push(`+1${req.body.phoneNumber}`);
  client.messages.create({
    body: req.body.text,
    to: req.body.phoneNumber,
    from: "+18592093414",
  });

  db.collection("new_campaigns").add({
    phone_number: "+18592093414",
    campaign_id: "12345",
    user_id: req.body.userId,
    initial_text: req.body.text,
    response_one: {
      response_string: req.body.responseOne[responseString],
      response_text: req.body.responseOne[responseText],
    },
    response_two: {
      response_string: req.body.responseTwo[responseString],
      response_text: req.body.responseTwo[responseText],
    },
    response_three: {
      response_string: req.body.responseThree[responseString],
      response_text: req.body.responseThree[responseText],
    },
    phoneNumbers: tempPhoneNums,
    status: "active",
  });
  res.json({ status: "This is the route to send the initial SMS" });
});

app.post("/review-response", async (req, res) => {
  const twiml = new MessagingResponse();
  let responseOne = "";
  let responseTwo = "";
  let responseThree = "";
  const responseString = req.body.Body;
  const phoneNumber = req.body.From;
  console.log(phoneNumber);
  const docRef = await db
    .collection("new_campaigns")
    .where("status", "==", "active")
    .where("phone_number", "==", `${req.body.To}`)
    .where("phoneNumbers", "array-contains", `${phoneNumber}`)
    .get();

  docRef.forEach((doc) => {
    if (
      doc.data().response_one.response_string === req.body.Body ||
      doc.data().response_two.response_string === req.body.Body ||
      doc.data().response_three.response_string === req.body.Body
    ) {
      responseOne = doc.data().response_one;
      responseTwo = doc.data().response_two;
      responseThree = doc.data().response_three;
      console.log(responseOne, responseTwo, responseThree);
    }
  });

  if (responseString.toUpperCase().includes(responseOne.response_string)) {
    twiml.message(`${responseOne.response_text}`);
  } else if (
    responseString.toUpperCase().includes(responseTwo.response_string)
  ) {
    twiml.message(`${responseTwo.response_text}`);
  } else if (
    responseString.toUpperCase().includes(responseThree.response_string)
  ) {
    twiml.message(`${responseThree.response_text}`);
  } else {
    twiml.message("We're sorry, we didn't recognize that command.");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`App is online at port: ${PORT}`);
});
