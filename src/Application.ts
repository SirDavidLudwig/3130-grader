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
	}

	/**
	 * Boot the application
	 */
	async boot() {
		await this.__electronApp.whenReady();
		// Additional modules/services here...
		this.createWindow();
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

	// ---------------------------------------------------------------------------------------------

	createWindow() {
		const win = new BrowserWindow({
			width: 800,
			height: 600,
			webPreferences: {
				nodeIntegration: true
			}
		});
		win.loadFile(path.resolve(__dirname, "ui/markdown_editor.html"));
		return win;
	}
}
