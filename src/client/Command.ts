import { Message } from "discord.js";
import { Client } from "./Client";

export interface ICommandOptions {
	name: string;
	description: string;
	permissionLevel: number;
}

export type CommandCallback = (
	client: Client,
	message: Message,
	args: string[],
) => any;

export class Command {
	public options: ICommandOptions;
	private callback: CommandCallback;
	constructor(options: ICommandOptions, callback: CommandCallback) {
		this.options = options;
		this.callback = callback;
	}
	public execute(client: Client, message: Message, args: string[]) {
		let permLevel = 0;
		if (message.member) {
			if (message.member.hasPermission("ADMINISTRATOR")) {
				permLevel = 2;
			}
		}
		if (client.options.permissionOverrides.indexOf(message.author.id)) {
			permLevel = 10;
		}
		if (permLevel >= this.options.permissionLevel) {
			this.callback(client, message, args);
		} else {
			return message.channel.send(
				"**Ooops!** You don't have permission to run this command.",
			);
		}
	}
}
