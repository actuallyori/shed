import * as Discord from "discord.js";
import { Card, CardSuit } from "../structures/Card";

export class CardStore {
	public deck: Discord.Collection<number, Card>;
	constructor() {
		this.deck = new Discord.Collection();
	}

	public getCards() {
		return this.deck.array();
	}

	public getCardsInSuite(suit: CardSuit) {
		return this.deck.find((card) => card.suit === suit);
	}

	public matchCards(matcher: (card: Card) => boolean) {
		return this.deck.find(matcher);
	}

	public splitCards(handSize: number) {}
}
