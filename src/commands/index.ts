import { Command } from "../interfaces/command.interface";
import { eggplant } from "./eggplant";
import { list } from "./list";
import { ping } from "./ping";

interface CommandDictionary {
  [k: string]: Command;
}

const commandCollection: Command[] = [ping, eggplant, list];
const commandDictionary: CommandDictionary = {};
commandCollection.forEach((cmd) => {
  commandDictionary[cmd.name] = cmd;

  if (cmd.aliases != null) {
    cmd.aliases.forEach((alias) => (commandDictionary[alias] = cmd));
  }
});

export default commandDictionary;
