import axios from "axios";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const TOKEN_FILE = "./jwt_token.txt";  

export async function fetchJwtToken() {
  const appId = process.env.APP_ID;
  const appSecret = process.env.APP_SECRET;  
  if (!appId || !appSecret) {
    console.error(
      "[Server A] Client ID or Client Secret is not set in environment variables."
    );
    return null;
  }

  try {
    const response = await axios.post("http://localhost:3001/auth/token", {
      appId,
      appSecret,
    });

    const token = response.data.token;
    fs.writeFileSync(TOKEN_FILE, token);
    console.log("[Server A] Token fetched and stored.");
    return token;
  } catch (err) {
    console.error(
      "[Server A] Failed to fetch token:",
      err.response?.data || err.message
    );
    return null;
  }
}

export function getStoredToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    return fs.readFileSync(TOKEN_FILE, "utf8");
  }
  return null;
}
