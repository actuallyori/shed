import { Collection, GuildMember, SnowflakeUtil } from "discord.js";
import { EventEmitter } from "events";

export class PartyInstance extends EventEmitter {
	public id: string;
	public guildId: string;
	public open: boolean;
	private members: Collection<string, GuildMember>;
	constructor() {
		super();
		this.members = new Collection();

		this.id = SnowflakeUtil.generate();
	}

	public addMember(member: GuildMember) {
		this.members.set(member.id, member);
		return this;
	}
	public hasMember(guild: string, member: GuildMember): boolean {
		if (this.members.get(member.id) && guild === this.guildId) {
			return true;
		} else {
			return false;
		}
	}
}
