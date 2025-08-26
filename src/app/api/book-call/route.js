import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, date, time } = body;

    console.log("Booking Request:", { name, email, date, time });

    // Read credentials file
    const credentialsPath = path.join(process.cwd(), 'src/config/credentials.json');
    const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const startDateTime = new Date(`${date.split("T")[0]}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 min

    const event = {
      summary: `Call with ${name}`,
      description: message,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Toronto',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Toronto',
      },
      // attendees: [{ email }], // ❌ REMOVE THIS to fix the issue
    };

    const response = await calendar.events.insert({
      calendarId: 'marotimayank@gmail.com',
      requestBody: event,
    });

    console.log("Booking Success:", response.data.htmlLink);
    return NextResponse.json({ success: true, eventLink: response.data.htmlLink });
  } catch (err) {
    console.error("Booking Error:", err);
    return NextResponse.json({ error: 'Failed to book call' }, { status: 500 });
  }
}
