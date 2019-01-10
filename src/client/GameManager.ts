import * as Discord from "discord.js";
import { BaseGamemode } from "../structures/BaseGamemode";
import { GameInstance } from "../structures/GameInstance";
import { Client } from "./Client";

export class GameManager {
	public client: Client;
	private gameInstances: Discord.Collection<string, GameInstance>;
	constructor(client: Client) {
		this.client = client;
	}

	public createGame(gamemode: BaseGamemode) {
		const newInstance = new GameInstance();
		this.gameInstances.set(newInstance.id, newInstance);
	}
}
