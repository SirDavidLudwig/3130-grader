import { app as electronApp } from "electron";
import Application from "./Application";
import { AppEvent } from "./events";

/**
 * Create the application
 */
let app = new Application(electronApp);

/**
 * Close the process when the app exits
 */
app.on(AppEvent.Exit, process.exit);

/**
 * Boot the application
 */
app.boot();


// function createWindow() {
// 	const win = new BrowserWindow({
// 		width: 800,
// 		height: 600,
// 		webPreferences: {
// 			nodeIntegration: true
// 		}
// 	});

// 	win.loadFile(resolve(__dirname, "ui/index.html"));
// }

// app.whenReady().then(createWindow);
