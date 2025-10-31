import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
  try {
    const { date } = await req.json();
    if (!date) {
      return NextResponse.json({ success: false, error: "Date is required" }, { status: 400 });
    }

    // ✅ STEP 1: Load credentials (works locally & on Vercel)
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
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });
    const calendarId = "marotimayank@gmail.com";

    // ✅ STEP 3: Define start and end of the given day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    // ✅ STEP 4: Fetch all booked events for that day
    const eventsRes = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = eventsRes.data.items || [];

    // ✅ STEP 5: Extract booked time slots
    const bookedTimes = events.map((ev) => {
      const start = new Date(ev.start.dateTime || ev.start.date);
      return start.toLocaleTimeString("en-CA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    });

    console.log(`📆 Found ${bookedTimes.length} booked slots for ${date}`);

    // ✅ STEP 6: Return success
    return NextResponse.json({ success: true, bookedTimes });
  } catch (err) {
    console.error("❌ Error fetching booked times:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
