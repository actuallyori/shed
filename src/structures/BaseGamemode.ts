export type BaseGamemodeType = "lose" | "gain" | "points";

export interface IBaseGamemodeScoring {
	rounds: false | number;
}

export interface IBaseGamemodeOptions {
	name: string;
	mode: "circular";
	scoring: false | IBaseGamemodeScoring;
	goal: BaseGamemodeType;
}

export class BaseGamemode {
	public options: IBaseGamemodeOptions;
	constructor(gamemodeOptions: IBaseGamemodeOptions) {
		this.options = gamemodeOptions;
	}
}
