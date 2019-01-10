import {
	Collection,
	Guild,
	GuildMember,
	SnowflakeUtil,
	TextChannel,
} from "discord.js";
import { PartyManager } from "../client/PartyManager";

export interface IPartyInstanceChannels {
	chat: TextChannel;
}
export class PartyInstance {
	public id: string;
	public guildId: string;
	public open: boolean;
	private channels: IPartyInstanceChannels;
	private parentManager: PartyManager;
	private members: Collection<string, GuildMember>;

	constructor(parentManager: PartyManager, guildId: string) {
		this.members = new Collection();
		this.parentManager = parentManager;
		this.guildId = guildId;

		this.id = SnowflakeUtil.generate();
		(this.parentManager.client.disgd.guilds.get(guildId) as Guild)
			.createChannel("chat", "text")
			.then((chat) => {
				this.channels.chat = chat as TextChannel;
				this.sync();
			});
		this.sync();
	}

	public addMember(member: GuildMember) {
		this.members.set(member.id, member);
		return this.sync();
	}

	public removeMember(member: GuildMember) {
		this.members.delete(member.id);
		if (this.members.size === 0) {
			console.log("[PARTY] Disbanding party ID", this.id);
			return this.parentManager.delete(this);
		} else {
			return this.sync();
		}
	}

	public hasMember(guild: string, member: GuildMember): boolean {
		if (this.members.get(member.id) && guild === this.guildId) {
			return true;
		} else {
			return false;
		}
	}

	private sync() {
		return this.parentManager.sync(this);
	}
}
