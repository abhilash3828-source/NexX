const { google } = require("googleapis");

let sheetsClient;

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!sheetId || !key) {
    return null;
  }

  let credentials;
  try {
    credentials = JSON.parse(key);
  } catch (err) {
    console.warn("Invalid GOOGLE_SERVICE_ACCOUNT_KEY JSON", err);
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  sheetsClient = google.sheets({ version: "v4", auth });
  return sheetsClient;
}

async function appendRegistrationToSheet(registration) {
  const sheets = getSheetsClient();
  if (!sheets) return null;

  const sheetId = process.env.GOOGLE_SHEET_ID;
  const row = [
    registration.fullName,
    registration.inGameName,
    registration.uid,
    registration.phone,
    registration.email,
    registration.txnId,
    registration.screenshotUrl,
    registration.createdAt,
    registration.eventId,
    registration.status
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row]
      }
    });
  } catch (err) {
    console.error("Failed to append registration to sheet", err);
  }
}

module.exports = { appendRegistrationToSheet };
