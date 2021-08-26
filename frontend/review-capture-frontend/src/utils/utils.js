import firebase from "../firebase";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export async function handleAddContact(userId, contactInfo) {
  if (!userId) return;
  if (!contactInfo) return;

  try {
    const { name, phoneNumber } = contactInfo;
    const docRef = await firebase.db.collection("contacts").add({
      user_id: userId,
      first_name: name,
      phone_number: phoneNumber,
    });

    return console.log("Sucsessfully added contact", docRef.id);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserContacts(userId) {
  if (!userId) return;
  const docRef = await firebase.db
    .collection("contacts")
    .where("user_id", "==", `${userId}`)
    .get();

  return docRef.docs;
}

export async function getMostRecentCampaign(userId) {
  const docs = [];
  const docRef = await firebase.db
    .collection("new_campaigns")
    .where("status", "==", "active")
    .where("user_id", "==", `${userId}`)
    .get();

  docRef.forEach((doc) => {
    docs.push(doc.data());
  });

  return docs[0];
}

export async function getActiveCampaigns(userId) {
  const docs = [];
  const docRef = await firebase.db
    .collection("new_campaigns")
    .where("status", "==", "active")
    .where("user_id", "==", `${userId}`)
    .get();

  docRef.forEach((doc) => {
    docs.push(doc.data());
  });

  return docs;
}

export async function handleStartCampaign(campaignInfo, isAddContact) {
  const response = await axios.post(
    "https://6b5561f0c64c.ngrok.io/new-campaign",
    campaignInfo
  );

  /* if (isAddContact) {
    //handle adding to contacts
    const contactInfo = {
      name: campaignInfo.firstName,
      phoneNumber: campaignInfo.phoneNumber,
    };
    await handleAddContact(userId, contactInfo);
  } */

  if (response.status === 200) {
    console.log("campaign started");
  } else {
    console.log("there has been a problem");
  }
}

export async function handleGetTemplates(userId) {
  if (!userId) return;
  let temp = [];
  const docRef = await firebase.db
    .collection("templates")
    .where("userId", "==", `${userId}`)
    .get();

  docRef.forEach((doc) => {
    temp.push(doc.data());
  });
  return temp;
}

export async function handleAddTemplate(userId, templateInfo, templateName) {
  if (!userId || !templateInfo) return;
  try {
    const docRef = await firebase.db.collection("templates").add({
      userId: userId,
      templateId: uuidv4(),
      name: templateName,
      templateInfo,
    });
  } catch (error) {
    console.error("couldnt add template", error);
  }

  return;
}
