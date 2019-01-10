import * as Discord from "discord.js";
import { EventEmitter } from "events";
import { Command } from "./Command";
import { GameManager } from "./GameManager";
import { PartyManager } from "./PartyManager";

export interface IClientOptions {
	token: string;
	prefix: string;
	permissionOverrides: string[];
}

export class Client extends EventEmitter {
	public disgd: Discord.Client;
	public options: IClientOptions;

	private commands: Discord.Collection<string, Command>;

	public gameManager: GameManager;
	public partyManager: PartyManager;

	constructor(options: IClientOptions) {
		super();
		this.options = options;

		this.disgd = new Discord.Client();
		this.commands = new Discord.Collection();

		this.gameManager = new GameManager(this);
		this.partyManager = new PartyManager(this);

		this.prepareClient();
	}

	private prepareClient() {
		this.disgd.on("message", (msg) => {
			if (msg.cleanContent.startsWith(this.options.prefix)) {
				const args = msg.content
					.slice(this.options.prefix.length)
					.trim()
					.split(/ +/g);
				if (args) {
					const temp = args.shift();
					if (temp) {
						const cmd = temp.toLowerCase();
						const cmdx = this.commands.find(
							(c) => c.options.name === cmd,
						);
						if (cmdx) {
							console.log(
								`[ CMD ] ${msg.author.id}, ${
									msg.author.tag
								} => ${cmd}`,
							);
							cmdx.execute(this, msg, args);
						}
					}
				}
			}
		});
	}

	public addCommand(command: Command) {
		this.commands.set(command.options.name, command);
		return this;
	}

	public async start() {
		console.log("Starting...");
		await this.disgd.login(this.options.token);
		console.log("[ READY ]");
	}
}
