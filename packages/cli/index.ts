import { cli } from "./src/cli.js";

try {
	cli()
} catch (err) {
	console.log(err)
}
