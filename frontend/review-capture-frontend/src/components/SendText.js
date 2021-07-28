import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ResponseContext from "../contexts/ResponseContext";
import { handleAddContact } from "../utils/utils";
import UserContext from "../contexts/UserContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import SendListContext from "../contexts/SendListContext";
import Button from "@material-ui/core/Button";
import { Dialog, DialogTitle } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListDialog(props) {
  const { onClose, open, list } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
    >
      <DialogTitle id="simple-dialog-title">Numbers in Campaign</DialogTitle>
      <div style={{ padding: "30px" }}>
        {list.map((number) => (
          <div style={{ padding: "10px" }}>
            <p>
              {number.name} | {number.phoneNumber}{" "}
            </p>
          </div>
        ))}
      </div>
    </Dialog>
  );
}

function SendText() {
  const { user } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isAddContact, setIsAddContact] = useState(false);
  const [sendListLength, setSendListLength] = useState(0);
  const { sendList, setSendList } = useContext(SendListContext);
  const [open, setOpen] = useState(false);

  const handleAddToList = (e) => {
    const newItem = {
      phoneNumber: phoneNumber,
      name: firstName,
      addContact: isAddContact,
    };
    const tempItems = sendList;
    tempItems.push(newItem);
    setSendList(tempItems);
    setSendListLength((previousValue) => (previousValue += 1));
    toast.success("Number has been added to campaign.");
    setPhoneNumber("");
    setFirstName("");
    console.log(sendListLength);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
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
      <button onClick={handleAddToList}>Add</button>
      <input
        type="checkbox"
        name="add-contact"
        id="contact-checkbox"
        value={isAddContact}
        onChange={(e) => setIsAddContact(e.target.checked)}
      />

      <label htmlFor="contact-checkbox">Add as contact?</label>
      {sendListLength >= 1 && (
        <div style={{ paddingTop: "20px" }}>
          <Button onClick={handleClickOpen}>View List</Button>
        </div>
      )}
      <ListDialog open={open} onClose={handleClose} list={sendList} />
      <ToastContainer />
    </div>
  );
}

export default SendText;
