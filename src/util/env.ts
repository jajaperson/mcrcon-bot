import * as dotenv from "dotenv";

dotenv.config();

const { TOKEN, RCON_HOST, RCON_PORT, RCON_PASS } = process.env;

if (TOKEN == null) {
  throw new Error("$TOKEN is missing");
}

if (RCON_HOST == null) {
  throw new Error("$RCON_HOST is missing");
}

if (RCON_PORT == null) {
  throw new Error("$RCON_PORT is missing");
}

if (RCON_PASS == null) {
  throw new Error("$RCON_PASS is missing");
}

export { TOKEN, RCON_HOST, RCON_PORT, RCON_PASS };
