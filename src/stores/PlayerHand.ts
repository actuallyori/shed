import * as Discord from "discord.js";
import { Card } from "../structures/Card";
import { CardStore } from "./CardStore";

export class PlayerHand extends CardStore {
	public user: Discord.User;
	constructor(user: Discord.User, hand?: Card[]) {
		super();
		this.user = user;

		if (hand) {
			hand.map((card) => {
				this.deck.set(card.id, card);
			});
		}
	}
}
