import { Client as DClient } from "discord.js";

import { handleCommand } from "./handle-command";
import { TOKEN } from "./util/env";
import * as log from "./util/log";

const client = new DClient();

client.on("ready", () => {
  if (client.user == null) {
    throw new Error("No user found.");
  }

  log.info(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
  if (client.user != null) {
    if (message.mentions.has(client.user)) {
      handleCommand(message, client);
    }
  }
});

client.login(TOKEN);
