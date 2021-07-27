import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ResponseContext from "../contexts/ResponseContext";
import { handleAddContact } from "../utils/utils";
import UserContext from "../contexts/UserContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";

function SendText() {
  const { user } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isAddContact, setIsAddContact] = useState(false);
  const { text } = useContext(ResponseContext);
  const { responseValues } = useContext(ResponseValuesContext);
  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:88/new-campaign", {
      phoneNumber: phoneNumber,
      name: firstName,
      text: text,
      userId: user.uid,
      responseOne: {
        responseString: responseValues["response-string-one"],
        responseText: responseValues["response-one"],
      },
      responseTwo: {
        responseString: responseValues["response-string-two"],
        responseText: responseValues["response-two"],
      },
      responseThree: {
        responseString: responseValues["response-string-three"],
        responseText: responseValues["response-three"],
      },
      phoneNumbers: `+1${phoneNumber}`,
    });

    if (isAddContact) {
      //handle adding to contacts
      const contactInfo = {
        name: firstName,
        phoneNumber: phoneNumber,
      };
      await handleAddContact(user.uid, contactInfo);
    }

    if (response.status === 200) {
      console.log("text sent");
    } else {
      console.log("there has been a problem");
    }
  };
  return (
    <div className="send-text">
      <input
        value={firstName}
        placeholder="Enter First Name: "
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        value={phoneNumber}
        placeholder="Enter Phone Number: "
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Now</button>
      <input
        type="checkbox"
        name="add-contact"
        id="contact-checkbox"
        value={isAddContact}
        onChange={(e) => setIsAddContact(e.target.checked)}
      />
      <label htmlFor="contact-checkbox">Add as contact?</label>
    </div>
  );
}

export default SendText;
