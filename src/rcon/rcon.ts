import * as pMemoize from "p-memoize";
import { Rcon } from "rcon-client";

import { RCON_HOST, RCON_PASS, RCON_PORT } from "../util/env";
import * as log from "../util/log";

const rClient = new Rcon({
  host: <string>RCON_HOST,
  port: Number(<string>RCON_PORT),
  password: <string>RCON_PASS,
});

const rconStart = async (): Promise<void> => {
  log.rcon("Processing RCON script");
  await rClient.connect();
};

const rconEnd = async (): Promise<void> => {
  await rClient.end();
  log.rcon("Completed RCON script");
};

export interface ListResult {
  number: number;
  max: number;
  players: string[];
  raw: string;
}

/**
 * RCON `list` command response processing pattern
 *
 * A regular expression for processing the data given in the server response to the `list` command. This regular expression contains 3 capture groups.
 *
 * 1. The number of players online
 * 2. The maximum number of players
 * 3. The usernames of all players online seperated by `, `
 */
const rconListResponsePattern = /(\d+) of a max (\d+).+: ?((?:[\w\d]+(?:, [\w\d]*)*)?)/;

export const list = pMemoize(
  async (): Promise<ListResult> => {
    await rconStart();

    const response = await rClient.send("list");
    const searchResult = response.match(rconListResponsePattern) || [];
    const number = Number(searchResult[1] || NaN);
    const max = Number(searchResult[2] || NaN);
    const players = (searchResult[3] || "").split(", ");

    rconEnd();
    return { number, max, players, raw: response };
  },
  { maxAge: 5000 },
);
