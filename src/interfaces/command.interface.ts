import { CommandContext } from "../handle-command";

export interface Command {
  name: string;
  aliases?: string[];
  handle: (ctx: CommandContext) => Promise<void>;
}
