import { RichEmbed } from "discord.js";
import { Client } from "../client/Client";

export class BotRichEmbed extends RichEmbed {
	constructor(client: Client) {
		super();
		this.setColor(0xfff);
		this.setTimestamp();
		this.setFooter("shed", client.disgd.user.avatarURL);
	}
}
