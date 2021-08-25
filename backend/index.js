const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 88;
const path = require("path");
const { uuid } = require("uuidv4");

const admin = require("firebase-admin");

const serviceAccount = require("./sms-review-capture-firebase-adminsdk-hxlhe-9dd43c85c9.json");

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
  const responseString = "responseString";
  const responseText = "responseText";
  const tempPhoneNums = [];

  req.body.phoneNumbers.forEach((number) => {
    client.messages.create({
      body: req.body.initial_text,
      to: number.phoneNumber,
      from: "+18592093414",
    });
    tempPhoneNums.push(`+1${number.phoneNumber}`);
  });

  db.collection("new_campaigns").add({
    phone_number: "+18592093414",
    campaign_id: uuid(),
    user_id: req.body.userId,
    initial_text: req.body.initial_text,
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
    phoneNumbers: req.body.phoneNumbers,
    numberList: tempPhoneNums,
    //errorResponse: req.body.errorResponse,
    status: "active",
  });
  res.json({ status: "This is the route to send the initial SMS" });
});

app.post("/review-response", async (req, res) => {
  const twiml = new MessagingResponse();
  let responseOne = "a";
  let responseTwo = "b";
  let responseThree = "c";
  let errorResponse = "";
  const responseString = req.body.Body;
  const phoneNumber = req.body.From;

  const docRef = await db
    .collection("new_campaigns")
    .where("status", "==", "active")
    .where("phone_number", "==", `${req.body.To}`)
    .where("numberList", "array-contains", `${phoneNumber}`)
    .get();

  docRef.forEach((doc) => {
    console.log(
      doc.data().response_one.response_string.toUpperCase(),
      req.body.Body.toUpperCase()
    );
    if (
      doc.data().response_one.response_string.toUpperCase() ===
        req.body.Body.toUpperCase() ||
      doc.data().response_two.response_string.toUpperCase() ===
        req.body.Body.toUpperCase() ||
      doc.data().response_three.response_string.toUpperCase() ===
        req.body.Body.toUpperCase()
    ) {
      responseOne = doc.data().response_one;
      responseTwo = doc.data().response_two;
      responseThree = doc.data().response_three;
      //errorResponse = doc.data().errorResponse;
      console.log(responseTwo, responseThree);
    }
  });

  try {
    if (
      responseString
        .toUpperCase()
        .includes(responseOne.response_string.toUpperCase())
    ) {
      twiml.message(`${responseOne.response_text}`);
    } else if (
      responseString
        .toUpperCase()
        .includes(responseTwo.response_string.toUpperCase())
    ) {
      twiml.message(`${responseTwo.response_text}`);
    } else if (
      responseString
        .toUpperCase()
        .includes(responseThree.response_string.toUpperCase())
    ) {
      twiml.message(`${responseThree.response_text}`);
    }
  } catch (error) {
    twiml.message("We're sorry, we don't recognize this command");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`App is online at port: ${PORT}`);
});
