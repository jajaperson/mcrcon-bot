import { Command } from "../interfaces/command.interface";

export const eggplant: Command = {
  name: "eggplant",
  aliases: ["suggestive"],
  handle: async (ctx) => {
    await ctx.reactionResponse("🍆");
  },
};
