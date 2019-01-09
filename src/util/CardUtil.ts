import { Card, CardSuit, CardValue } from "../structures/Card";

export function getSuitFromID(cardID: number): CardSuit {
	if (cardID < 13) {
		return "spades";
	} else if (cardID < 26) {
		return "hearts";
	} else if (cardID < 39) {
		return "clubs";
	} else if (cardID < 52) {
		return "diamonds";
	} else {
		throw Error("Card index out of range");
	}
}
export function getCardValueFromID(cardID: number): CardValue {
	return ((cardID + 1) % 13 === 0 ? 13 : (cardID + 1) % 13) as CardValue;
}

export function getCardFromID(cardID: number): Card {
	return {
		id: cardID,
		suit: getSuitFromID(cardID),
		value: getCardValueFromID(cardID),
	};
}
