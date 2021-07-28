import React, { useContext, useEffect, useState } from "react";
import { getUserContacts } from "../utils/utils";
import UserContext from "../contexts/UserContext";
import ContactsList from "../components/ContactsList";

function Contacts() {
  const { user } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!user) return;
    handleSetContacts();
  }, [user]);

  const handleSetContacts = async () => {
    const temp = [];
    const docs = await getUserContacts(user.uid);
    docs.forEach((doc) => {
      temp.push(doc.data());
    });
    console.log(temp);
    setContacts(temp);
  };
  return (
    <div className="contacts">
      <h1>Contacts Page</h1>
      <ContactsList contacts={contacts} />
    </div>
  );
}

export default Contacts;
