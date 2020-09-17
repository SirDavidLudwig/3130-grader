import child_process, { ChildProcess } from "child_process";
import fs from "fs";
import { URL } from "url";
import downloadFile, {ProgressCallback} from "./download";
import { autobind } from "./utils";

/**
 * The URL to download logisim from SourceForge
 */
const BASE_URL = "https://downloads.sourceforge.net/";
const LOGISIM_URI = "/project/circuit/2.7.x/2.7.1/logisim-generic-2.7.1.jar";

/**
 * Generate a download URL
 *
 * @return {string}
 */
function generateUrl() {
	let url = new URL(LOGISIM_URI, BASE_URL);
	url.searchParams.set("ts", Math.floor(Date.now() / 1000).toString());
	return url.href;
}

/**
 * Download the Logisim JAR file
 */
export async function download(dest: fs.PathLike, progress: ProgressCallback) {
	return downloadFile(generateUrl(), dest, progress);
}

/**
 * Open a circuit file in Logisim
 */
export function open(logisimPath: fs.PathLike, circuit: fs.PathLike) {
	return child_process.spawn("java", ["-jar", logisimPath.toString(), circuit.toString()]);
}

/**
 * A simple child-process wrapper for Logisim
 */
export default class LogisimProcess
{
	/**
	 * Path to the Java binary
	 */
	public readonly java: fs.PathLike;

	/**
	 * Path to the JAR file
	 */
	public readonly jarPath: fs.PathLike;

	/**
	 * Path to the most recently opened circuit file
	 */
	private __circuitPath?: fs.PathLike = null;

	/**
	 * Child process instance
	 */
	private __process?: ChildProcess = null;

	/**
	 * Determine if the process is currently running
	 */
	private __isRunning: boolean = false;

	/**
	 * Create a new Logisim process instance
	 */
	constructor(jarPath: fs.PathLike, java: fs.PathLike = "java") {
		this.java = java;
		this.jarPath = jarPath;
		autobind(this);
	}

	/**
	 * Check if the current instance is running
	 */
	public isRunning() {
		return this.__isRunning;
	}

	/**
	 * Open the circuit file
	 */
	public open(circuitPath: fs.PathLike) {
		this.__circuitPath = circuitPath;
		this.restart();
	}

	/**
	 * Kill the current Logisim instance
	 */
	public kill(signal?: number | NodeJS.Signals) {
		if (this.__process === null) {
			throw new Error("Attempted to close a dead Logisim instance");
		}
		this.__isRunning = !this.__process.kill(signal);
		this.__process.removeAllListeners();
		this.__process = null;
		return !this.__isRunning;
	}

	/**
	 * Restart the current Logisim instance
	 */
	public restart() {
		if (this.__process !== null) {
			if (!this.kill()) {
				throw new Error("Failed to close Logisim instance");
			}
		}
		this.start();
	}

	/**
	 * Start the Logisim instance
	 */
	public start() {
		if (this.__process !== null) {
			throw new Error("Attempted to start a Logisim instance that is already running");
		}

		// Spawn the process
		this.__process = child_process.spawn(this.java.toString(), [
			"-jar", this.jarPath.toString(),
			(this.__circuitPath ? this.__circuitPath.toString() : "")]);

		// Map the events
		this.__process.on("exit", this.onClose);
	}

	// Event Handlers ------------------------------------------------------------------------------

	/**
	 * Invoked when the child process closes
	 */
	protected onClose() {
		console.log("Closed");
		this.__isRunning = false;
		this.__process.removeAllListeners();
		this.__process = null;
	}

	// Accessors -----------------------------------------------------------------------------------

	/**
	 * The active child process reference
	 */
	public get process() {
		return this.__process;
	}
}
