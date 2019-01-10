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

	public createParty(guildId: string) {
		const party = new PartyInstance(this, guildId);
		console.log(
			"[PARTY] Created party ID",
			party.id,
			"in guild ID",
			party.guildId,
		);
		return this.partyStore.get(party.id) as PartyInstance;
	}

	public delete(party: PartyInstance) {
		this.partyStore.delete(party.id);
		return;
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
		return this.partyStore
			.filter((v) => v.guildId === guild && (open ? v.open : true))
			.array();
	}

	public sync(party: PartyInstance) {
		console.log("[PARTY] Syncing party ID", party.id);
		return this.partyStore
			.set(party.id, party)
			.get(party.id) as PartyInstance;
	}
}
