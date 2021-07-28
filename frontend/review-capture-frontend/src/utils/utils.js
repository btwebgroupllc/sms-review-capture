import firebase from "../firebase";
import axios from "axios";
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

export async function handleStartCampaign(campaignInfo, userId, isAddContact) {
  const response = await axios.post(
    "http://localhost:88/new-campaign",
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
