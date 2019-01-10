import { Command } from "../../client/Command";
import { BotRichEmbed } from "../../structures/RichEmbed";

export const party = new Command(
	{
		description: "Party tool",
		name: "party",
		permissionLevel: 0,
	},
	(c, m, a) => {
		const embed = new BotRichEmbed(c).setTitle("Party Manager");
		if (!a[0]) {
			if (c.partyManager.isInParty(m.guild.id, m.member)) {
				const p = c.partyManager.getMemberParty(m.guild.id, m.member);
				embed
					.setTitle("Current Party")
					.setDescription(`ID: \`${p.id}\``);

				return m.channel.send({ embed });
			} else {
				if (
					c.partyManager.getPartiesInGuild(m.guild.id, true).length <
					0
				) {
					embed.setDescription(
						`You're not currently in a party! Join one by running \`$party join <tag|id>\`, or create your own using \`$party create\`.

Alternatively, you could join one of the open parties below:
${c.partyManager
							.getPartiesInGuild(m.guild.id, true)
							.map((v) => `\`${v.id}\``)}`,
					);
				} else {
					embed.setDescription(
						"You're not currently in a party! Join one by running `$party join <tag|id>`, or create your own using `$party create`.",
					);
				}

				return m.channel.send({ embed });
			}
		} else {
			switch (a[0]) {
				case "create": {
					if (c.partyManager.isInParty(m.guild.id, m.member)) {
						embed.setDescription(
							"You're already in a party! You can leave your current one by running `$party leave`.",
						);
					} else {
						const p = c.partyManager
							.createParty(m.guild.id)
							.addMember(m.member);
						embed.setTitle("Party Created").setDescription(
							`Sucessfully created your party! You can invite people using \`$party invite <tag|id>\`, or view party info by running \`$party\`.

Your party ID: \`${p.id}\`.`,
						);
					}
					return m.channel.send({ embed });
				}
				case "leave": {
					if (!c.partyManager.getMemberParty(m.guild.id, m.member)) {
						embed.setDescription(
							"You aren't in a party, so there's no need to leave!",
						);
					} else {
						const p = c.partyManager.getMemberParty(
							m.guild.id,
							m.member,
						);
						p.removeMember(m.member);
						if (
							c.partyManager
								.getPartiesInGuild(m.guild.id)
								.filter((v) => v.id === p.id).length === 0
						) {
							embed.setDescription(
								`You disbanded party ID \`${p.id}\`.`,
							);
						} else {
							embed.setDescription(
								`You left party ID \`${p.id}\`.`,
							);
						}
					}
					return m.channel.send({ embed });
				}
				default: {
					console.log(a[0]);
					return m.reply("Unknown party command.");
				}
			}
		}
	},
);
