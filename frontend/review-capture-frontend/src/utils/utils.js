import firebase from "../firebase";
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

export async function getCurrentCampaign(userId) {
  const docs = [];
  const docRef = await firebase.db
    .collection("campaigns")
    .where("status", "==", "active")
    .where("user_id", "==", `${userId}`)
    .get();

  docRef.forEach((doc) => {
    docs.push(doc.data());
  });

  return docs[0];
}
