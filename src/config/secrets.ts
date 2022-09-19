import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const DISCORD_TOKEN = process.env["TOKEN"];
const TODOIST_TOKEN = process.env["TODOIST_TOKEN"];
const CLIENT_ID = process.env["CLIENT_ID"];

if (!DISCORD_TOKEN) {
  console.error("No 'discord token' provided in .env file.");
} else if (!TODOIST_TOKEN) {
  console.error("No Todoist token provided");
} else if (!CLIENT_ID) {
  console.error("No Client id token provided");
}

export { DISCORD_TOKEN, TODOIST_TOKEN, CLIENT_ID };