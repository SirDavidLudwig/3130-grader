import { EventEmitter } from "events";
import { AppEvent } from "./events";
import { autobind } from "./util/utils";

export default class Application extends EventEmitter
{
	/**
	 * Reference to the current electron application instance
	 */
	private __electronApp: Electron.App;

	/**
	 * Create a new application
	 *
	 * @param app The current electron application instance
	 */
	constructor(app: Electron.App) {
		super();
		this.__electronApp = app;
		autobind(this);
	}

	/**
	 * Boot the application
	 */
	async boot() {
		console.log("Booting...");
	}

	/**
	 * Shut the application down
	 */
	async shutdown() {
		console.log("Shutting down...")
	}

	/**
	 * Close the application
	 *
	 * @param code The exit code
	 */
	async exit(code: number = 0) {
		await this.shutdown();
		this.emit(AppEvent.Exit, code);
	}
}
