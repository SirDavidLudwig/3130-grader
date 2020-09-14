import { app, BrowserWindow } from "electron";
// import * as path from "path";
import { resolve } from "path";

console.log("The path is", __dirname);

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile(resolve(__dirname, "ui/index.html"));
}

app.whenReady().then(createWindow);
