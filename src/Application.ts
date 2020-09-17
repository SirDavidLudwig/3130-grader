import { BrowserWindow } from "electron";
import { EventEmitter } from "events";
import * as path from "path";
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
		app.on("quit", this.onQuit);
	}

	/**
	 * Boot the application
	 */
	async boot() {
		await this.__electronApp.whenReady();
		// Additional modules/services here...
		this.createWindow();

		return true;
	}

	/**
	 * Shut the application down
	 */
	protected async shutdown() {
		console.log("Shutting down...");
		const end = Date.now() + 1000;
		while (Date.now() < end) continue;
		console.log("Shutdown successful");
	}

	// Event Handling ------------------------------------------------------------------------------

	/**
	 * Shutdown the application before quitting...
	 */
	async onQuit() {
		await this.shutdown();
	}

	// Methods -------------------------------------------------------------------------------------

	/**
	 * Execute the application
	 */
	exec() {
		// Boot the application
		if (!this.boot()) {
			this.exit(1);
			return;
		}
	}

	/**
	 * Close the application
	 *
	 * @param code The exit code
	 */
	async exit(code: number = 0) {
		this.__electronApp.exit(code);
	}

	createWindow() {
		const win = new BrowserWindow({
			width: 800,
			height: 600,
			webPreferences: {
				nodeIntegration: true
			}
		});
		win.loadFile(path.resolve(__dirname, "ui/index.html"));
		return win;
	}
}
