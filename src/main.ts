import { app as electronApp } from "electron";
import Application from "./Application";
import { AppEvent } from "./events";

/**
 * Create the application
 */
let app = new Application(electronApp);

/**
 * Execute the application
 */
app.exec();
