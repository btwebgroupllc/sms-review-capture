const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 88;
const path = require("path");

require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const accountToken = process.env.ACCOUNT_TOKEN;

const client = require("twilio")(accountSid, accountToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

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

app.post("/send-review", (req, res) => {
  console.log(req.body.phoneNumber);
  client.messages.create({
    body: "Would you mind please leaving us a review? Type GREAT if we did an amazing job! Type OK if we just did alright, and type BAD if we need improvement.",
    to: req.body.phoneNumber,
    from: "+18594847377",
  });
  res.json({ status: "This is the route to send the initial SMS" });
});

app.post("/review-response", (req, res) => {
  const twiml = new MessagingResponse();
  const responseString = req.body.Body;

  if (responseString.toUpperCase().includes("GREAT")) {
    twiml.message(
      "That's great to hear! Would you mind taking the time to review us on Google? {{Paste Google link here.}}"
    );
  } else if (responseString.toUpperCase().includes("OK")) {
    twiml.message(
      "Would you mind taking the time to let us know what we could do to improve? --> {{Feedback link here}}"
    );
  } else if (responseString.toUpperCase().includes("BAD")) {
    twiml.message(
      "We're sorry, we would love to know what we could do to improve. --> {{Feedback link here}}"
    );
  } else {
    twiml.message(
      "We're sorry, we didn't recognize that command. Please enter one of the following...GREAT, OK, BAD"
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`App is online at port: ${PORT}`);
});
