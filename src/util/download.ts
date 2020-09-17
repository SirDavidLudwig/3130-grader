import Axios, { AxiosResponse } from "axios";
import fs from "fs";

/**
 * Callback function for download progress
 */
export declare type ProgressCallback = (receivedBytes: number, totalBytes: number) => void;

/**
 * Create an Axios request
 */
async function request(url: string) {
	let response = await Axios({
		url,
		method: "GET",
		responseType: "stream"
	});
	return response;
}

/**
 * Download from the URL to the file
 */
export default function download(url: string, dest: fs.PathLike, progress?: ProgressCallback) {
	return new Promise<void>(async (resolve, reject) => {
		try {
			let {data, headers} = await request(url);
			let totalBytes = headers["content-length"];
			let receivedBytes = 0;

			let file = fs.createWriteStream(dest);
			data.on("data", (chunk: Buffer) => {
				receivedBytes += chunk.length
				progress(receivedBytes, totalBytes);
			})
			.pipe(file);

			file.on("finish", () => {
				console.log("File finished");
				file.close();
				resolve();
			})
			.on("error", (err) => {
				fs.unlink(dest, null);
				reject(err);
			})
		} catch (err) {
			console.error(err);
			reject(err);
			return;
		}
	});
}
