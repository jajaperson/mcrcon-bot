import * as chalk from "chalk";

export const info = (s: string): void =>
  console.log(chalk.cyan(`[info]    ${s}`));
export const recieve = (s: string): void =>
  console.log(chalk.magenta(`[command] ${s}`));
export const rcon = (s: string): void =>
  console.log(chalk.yellowBright(`[mcrcon]  ${s}`));
