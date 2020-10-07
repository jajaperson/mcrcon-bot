import { Command } from "../interfaces/command.interface";

export const ping: Command = {
  name: "ping",
  handle: async (ctx) => {
    await ctx.messageResponse("pong");
  },
};
