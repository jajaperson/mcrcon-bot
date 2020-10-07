import { MessageEmbed } from "discord.js";

import { Command } from "../interfaces/command.interface";
import { list as rconList } from "../rcon/rcon";

export const list: Command = {
  name: "list",
  aliases: ["online", "listplayers"],
  handle: async (ctx) => {
    const listResult = await rconList();
    const response = new MessageEmbed()
      .setColor("#4da856")
      .setTitle("Players currently on ChungusCraft")
      .setDescription(listResult.players.join(", "))
      .addFields([
        { name: "\u200B", value: "\u200B" },
        { name: "Total players", value: listResult.number, inline: true },
        { name: "Max players", value: listResult.number, inline: true },
      ]);
    await ctx.messageResponse(response);
  },
};
