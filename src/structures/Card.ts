import * as CardUtil from "../util/CardUtil";

export type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class Card {
	public id: number;

	constructor(id: number) {
		this.id = id;
	}

	get suit(): CardSuit {
		return CardUtil.getSuitFromID(this.id);
	}

	get value(): CardValue {
		return CardUtil.getCardValueFromID(this.id);
	}
}
