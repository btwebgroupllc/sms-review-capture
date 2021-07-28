import React from "react";
import { Card, CardContent } from "@material-ui/core";

function ContactsItem({ contact }) {
  return (
    <div
      className="contact-item"
      style={{
        margin: "5px",
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Card>
        <CardContent>
          <p>{contact.first_name}</p>
          <p>{contact.phone_number}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactsItem;
