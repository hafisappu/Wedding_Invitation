"use server";

import fs from "fs";
import path from "path";

export interface RsvpResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function submitRSVP(formData: {
  name: string;
  phone: string;
  guests: number;
  attending: boolean;
}): Promise<RsvpResponse> {
  try {
    const { name, phone, guests, attending } = formData;

    if (!name || !phone) {
      return { success: false, message: "Name and phone number are required." };
    }

    const newRsvp = {
      name: name.trim(),
      phone: phone.trim(),
      guests: Number(guests) || 1,
      attending,
      createdAt: new Date().toISOString(),
    };

    // 1. Try Supabase if env variables are available
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rsvps`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseAnonKey,
            "Authorization": `Bearer ${supabaseAnonKey}`,
            "Prefer": "return=representation",
          },
          body: JSON.stringify(newRsvp),
        });

        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            message: "RSVP submitted successfully to Supabase database!",
            data,
          };
        } else {
          const errText = await response.text();
          console.error("Supabase submission error response:", errText);
          // Fall back to local file if Supabase fails (e.g. table doesn't exist yet)
        }
      } catch (supabaseError) {
        console.error("Failed connecting to Supabase, falling back to local file:", supabaseError);
      }
    }

    // 2. Local fallback storage
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "rsvps.json");

    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let rsvpsList = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        rsvpsList = JSON.parse(fileContent || "[]");
      } catch (readError) {
        console.error("Error reading rsvps.json, resetting array:", readError);
        rsvpsList = [];
      }
    }

    rsvpsList.push(newRsvp);
    fs.writeFileSync(filePath, JSON.stringify(rsvpsList, null, 2), "utf-8");

    return {
      success: true,
      message: "RSVP submitted successfully (saved locally)!",
      data: newRsvp,
    };
  } catch (error: any) {
    console.error("RSVP submission error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred during RSVP submission.",
    };
  }
}
