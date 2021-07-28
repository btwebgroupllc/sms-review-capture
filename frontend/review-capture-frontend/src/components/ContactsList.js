import React from "react";
import ContactsItem from "./ContactsItem";

function ContactsList({ contacts }) {
  return (
    <div>
      {contacts.map((contact) => (
        <ContactsItem contact={contact} key={contact.phone_number} />
      ))}
    </div>
  );
}

export default ContactsList;
