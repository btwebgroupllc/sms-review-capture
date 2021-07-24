import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ResponseContext from "../contexts/ResponseContext";

function SendText() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const { text } = useContext(ResponseContext);
  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:88/send-review", {
      phoneNumber: phoneNumber,
      name: firstName,
      text: text,
    });

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
      <input type="checkbox" name="add-contact" id="contact-checkbox" />
      <label htmlFor="contact-checkbox">Add as contact?</label>
    </div>
  );
}

export default SendText;
