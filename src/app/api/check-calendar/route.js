import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, reason, message, date, time } = body;

    console.log("📅 Booking Request:", { name, email, phone, reason, date, time });

    // ✅ STEP 1: Load Google credentials (works both locally & on Vercel)
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
    const calendarId = "marotimayank@gmail.com"; // ✅ your calendar ID

    // ✅ STEP 3: Parse and validate booking time
    const startDateTime = new Date(`${date.split("T")[0]}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    // Allow bookings only 9 AM – 5 PM
    const hour = startDateTime.getHours();
    if (hour < 9 || hour >= 17) {
      return NextResponse.json(
        { error: "Please select a time between 9 AM and 5 PM." },
        { status: 400 }
      );
    }

    // Allow only weekdays
    const day = startDateTime.getDay();
    if (day === 0 || day === 6) {
      return NextResponse.json(
        { error: "Please select a weekday (Mon – Fri)." },
        { status: 400 }
      );
    }

    // ✅ STEP 4: Check for conflicting events (30 min buffer)
    const eventsRes = await calendar.events.list({
      calendarId,
      timeMin: new Date(startDateTime.getTime() - 60 * 60 * 1000).toISOString(),
      timeMax: new Date(endDateTime.getTime() + 60 * 60 * 1000).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = eventsRes.data.items || [];
    const conflict = events.some((event) => {
      const evStart = new Date(event.start.dateTime || event.start.date);
      const evEnd = new Date(event.end.dateTime || event.end.date);
      const buffer = 30 * 60 * 1000;
      return (
        (startDateTime >= evStart - buffer && startDateTime < evEnd + buffer) ||
        (endDateTime > evStart - buffer && endDateTime <= evEnd + buffer)
      );
    });

    if (conflict) {
      return NextResponse.json(
        { error: "That time slot is unavailable. Please choose another." },
        { status: 409 }
      );
    }

    // ✅ STEP 5: Create event
    const event = {
      summary: `Call with ${name}   ${reason}`,
      description: `Reason: ${reason}\nPhone: ${phone}\nEmail: ${email}\n\n${message || ""}`,
      start: { dateTime: startDateTime.toISOString(), timeZone: "America/Toronto" },
      end: { dateTime: endDateTime.toISOString(), timeZone: "America/Toronto" },
      reminders: { useDefault: true },
    };

    // ✅ STEP 6: Insert event (no attendees to avoid DWD permission issues)
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: "none", // prevents 403 sendUpdates error
    });

    console.log(`
✅ Booking successfully added to Google Calendar!
📆 Calendar ID: ${calendarId}
🔗 Event Link: ${response.data.htmlLink}
👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
🕒 Time: ${startDateTime.toLocaleString("en-US", { timeZone: "America/Toronto" })}
`);

    // ✅ STEP 7: Return success response
    return NextResponse.json({
      success: true,
      eventLink: response.data.htmlLink,
      message: "Booking confirmed!",
    });

  } catch (err) {
    console.error("❌ Booking Error:", err);
    return NextResponse.json(
      { error: "Failed to book call. Please try again later." },
      { status: 500 }
    );
  }
}
