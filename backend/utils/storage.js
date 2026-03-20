const Registration = require("../models/Registration");

async function readAll() {
  try {
    const records = await Registration.find({}).sort({ createdAt: -1 });
    return records.map((doc) => ({
      id: doc.id,
      eventId: doc.eventId,
      fullName: doc.fullName,
      inGameName: doc.inGameName,
      uid: doc.uid,
      phone: doc.phone,
      email: doc.email,
      txnId: doc.txnId,
      screenshotUrl: doc.screenshotUrl,
      createdAt: doc.createdAt.toISOString(),
      status: doc.status
    }));
  } catch (err) {
    console.error("Error reading registrations:", err);
    return [];
  }
}

async function addRegistration(record) {
  try {
    const registration = new Registration(record);
    await registration.save();
    return record;
  } catch (err) {
    console.error("Error adding registration:", err);
    throw err;
  }
}

async function updateRegistration(id, updates) {
  try {
    const registration = await Registration.findOneAndUpdate({ id }, updates, { new: true });
    if (!registration) return null;
    return {
      id: registration.id,
      eventId: registration.eventId,
      fullName: registration.fullName,
      inGameName: registration.inGameName,
      uid: registration.uid,
      phone: registration.phone,
      email: registration.email,
      txnId: registration.txnId,
      screenshotUrl: registration.screenshotUrl,
      createdAt: registration.createdAt.toISOString(),
      status: registration.status
    };
  } catch (err) {
    console.error("Error updating registration:", err);
    return null;
  }
}

async function getByEventAndUID(eventId, uid) {
  try {
    const registration = await Registration.findOne({ eventId, uid });
    return registration;
  } catch (err) {
    console.error("Error fetching registration:", err);
    return null;
  }
}

async function countApprovedByEvent(eventId) {
  try {
    const count = await Registration.countDocuments({ eventId, status: "approved" });
    return count;
  } catch (err) {
    console.error("Error counting approvals:", err);
    return 0;
  }
}

module.exports = {
  readAll,
  addRegistration,
  updateRegistration,
  getByEventAndUID,
  countApprovedByEvent
};
