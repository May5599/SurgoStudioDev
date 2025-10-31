import { google } from "googleapis";
import path from "path";
import { promises as fs } from "fs";

async function addCalendarToList() {
  try {
    console.log("🗓 Starting calendar insertion...");

    // ✅ STEP 1 — Load credentials (works locally & on Vercel)
    let credentials;
    if (process.env.GOOGLE_CREDENTIALS) {
      console.log("🔐 Using credentials from environment variable");
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    } else {
      console.log("💻 Using local credentials.json file");
      const credentialsPath = path.join(process.cwd(), "src/config/credentials.json");
      credentials = JSON.parse(await fs.readFile(credentialsPath, "utf8"));
    }

    // ✅ STEP 2 — Initialize Google Calendar API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // ✅ STEP 3 — Choose your target calendar
    const calendarId = process.env.CALENDAR_ID || "marotimayank@gmail.com";

    console.log(`📁 Target calendar: ${calendarId}`);

    // ✅ STEP 4 — Try to add the calendar to the service account’s list
    const res = await calendar.calendarList.insert({
      requestBody: {
        id: calendarId,
      },
    });

    console.log("✅ Calendar added to service account’s list successfully!");
    console.log("📅 Calendar Info:", res.data);

  } catch (err) {
    // ✅ STEP 5 — Robust error handling
    console.error("❌ Error adding calendar to service account’s list:");
    if (err.errors) {
      err.errors.forEach((e) =>
        console.error(`→ ${e.message} (${e.reason || "unknown reason"})`)
      );
    } else {
      console.error(err.message || err);
    }
  }
}

addCalendarToList();
