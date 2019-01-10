import { Client } from "../client/Client";
import { party } from "./cmds/party";

new Client({
	permissionOverrides: ["210118905006522369"],
	prefix: "$",
	token: "NTMyNjk5NjA0MzA3OTM1MjQy.DxgTLA.R3770hHfMGX3Swg1uGOvbgncb9c",
})
	.addCommand(party)
	.start();
