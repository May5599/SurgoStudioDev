import { google } from "googleapis";
import path from "path";
import { promises as fs } from "fs";

async function grantAccess() {
  try {
    // ✅ STEP 1: Load credentials (works locally and in Vercel)
    let credentials;
    if (process.env.GOOGLE_CREDENTIALS) {
      console.log("🔐 Using credentials from environment variable");
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    } else {
      console.log("💻 Using local credentials.json file");
      const credentialsPath = path.join(process.cwd(), "src/config/credentials.json");
      credentials = JSON.parse(await fs.readFile(credentialsPath, "utf8"));
    }

    // ✅ STEP 2: Authenticate with Google Calendar
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // ✅ STEP 3: Define calendar + service account email
    const calendarId = "marotimayank@gmail.com"; // 👈 replace if using another calendar
    const serviceAccountEmail =
      "surgo-booking-integration@email-fd554.iam.gserviceaccount.com"; // 👈 your service account

    console.log(`⚙️ Granting 'writer' access to ${serviceAccountEmail} on ${calendarId}...`);

    // ✅ STEP 4: Attempt to grant access
    const res = await calendar.acl.insert({
      calendarId,
      requestBody: {
        role: "writer",
        scope: {
          type: "user",
          value: serviceAccountEmail,
        },
      },
    });

    console.log("✅ Access successfully granted!");
    console.log(JSON.stringify(res.data, null, 2));

  } catch (err) {
    console.error("❌ Error granting calendar access:", err.message);

    // Show detailed Google API error info (if available)
    if (err.errors) {
      console.error("📄 Detailed error info:", JSON.stringify(err.errors, null, 2));
    }

    // Provide a friendly reminder
    console.log(`
⚠️ Make sure you've shared the calendar manually if this fails:
  1️⃣ Open https://calendar.google.com
  2️⃣ Go to Settings → "Share with specific people"
  3️⃣ Add this email: surgo-booking-integration@email-fd554.iam.gserviceaccount.com
  4️⃣ Give it "Make changes to events" access
`);
  }
}

// Run directly
grantAccess();
