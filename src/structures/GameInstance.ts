import { Collection, GuildMember, SnowflakeUtil } from "discord.js";
import { EventEmitter } from "events";

export class GameInstance extends EventEmitter {
	public id: string;
	public guildId: string;
	private players: Collection<string, GuildMember>;
	constructor() {
		super();
		this.players = new Collection();

		this.id = SnowflakeUtil.generate();
	}

	public addPlayer(player: GuildMember) {
		this.players.set(player.id, player);
		return this;
	}
}
