import * as Discord from "discord.js";
import { PartyInstance } from "../structures/PartyInstance";
import { Client } from "./Client";

export class PartyManager {
	public client: Client;
	private partyStore: Discord.Collection<string, PartyInstance>;
	constructor(client: Client) {
		this.client = client;
		this.partyStore = new Discord.Collection();
	}

	public createParty() {
		const party = new PartyInstance();
		this.partyStore.set(party.id, party);
		return party;
	}
	public isInParty(guild: string, member: Discord.GuildMember) {
		if (this.partyStore.find((v) => v.hasMember(guild, member))) {
			return true;
		} else {
			return false;
		}
	}

	public getMemberParty(guild: string, member: Discord.GuildMember) {
		return this.partyStore.find((v) => v.hasMember(guild, member));
	}

	public getPartiesInGuild(guild: string, open?: boolean) {
		return this.partyStore.filter(
			(v) => v.guildId === guild && (open ? v.open : true),
		);
	}
}
