import {
  APIMessage,
  Client,
  EmojiIdentifierResolvable,
  Message,
  MessageMentions,
  MessageReaction,
  StringResolvable,
} from "discord.js";

import commands from "./commands";
import * as log from "./util/log";

type messageContentType = StringResolvable | APIMessage;

export class CommandContext {
  #message: Message;
  #client: Client;

  constructor(message: Message, client: Client) {
    this.#message = message;
    this.#client = client;
  }

  get commandString(): string {
    return this.#message.content
      .replace(MessageMentions.USERS_PATTERN, "")
      .trimLeft();
  }

  get commandArgs(): string[] {
    return this.commandString.split(" ");
  }

  async messageResponse(
    content: messageContentType,
  ): Promise<Message | Message[]> {
    return await this.#message.channel.send(content);
  }

  async replyResponse(
    content: messageContentType,
  ): Promise<Message | Message[]> {
    return await this.#message.reply(content);
  }

  async reactionResponse(
    emoji: EmojiIdentifierResolvable,
  ): Promise<MessageReaction> {
    return await this.#message.react(emoji);
  }
}

export function handleCommand(message: Message, client: Client): void {
  const ctx = new CommandContext(message, client);
  const masterCommand = ctx.commandArgs[0];

  if (commands[masterCommand]) {
    log.recieve(`Handling command: ${ctx.commandString}`);
    commands[masterCommand].handle(ctx);
  } else {
    log.recieve(`Unidentified command: ${ctx.commandString}`);
  }
}
