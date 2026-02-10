import app from "../app.js";
import connectDB from "../DB/connection.js";

export default async function handler(req, res) {
  try {
    // Har request par check karega ke DB connected hai ya nahi
    await connectDB();
    // Phir Express app ko handle karne dega
    app(req, res);
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
}