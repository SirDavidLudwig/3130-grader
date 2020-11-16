import { readFile } from "fs";
import xml2js from "xml2js";
import { Circuit } from "./Circuit";

import * as components from "./components";
import { IComponentMap, IComponentType } from "./components/Component";
import { ILogisimXml, ICircuitXml } from "./interfaces";

/**
 * Load all available components
 */
function loadComponents() {
	let componentMap: IComponentMap = {};
	for (let component of Object.values(components)) {
		componentMap[component.NAME] = component;
	}
	return componentMap;
}

/**
 * Open and parse the circuit XML file
 */
function openCircuitFile(file: string) {
	return new Promise<ILogisimXml>((resolve, reject) => {
		let parser = new xml2js.Parser();
		readFile(file, (err, data) => {
			if (err) {
				reject(err);
			} else {
				parser.parseString(data, (err: any, result: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			}
		});
	});
}

/**
 * Create the circuit
 */
function createCircuit() {

}

async function run() {
	let components = loadComponents();
	let xml = await openCircuitFile("test.circ");
	let circuit = new Circuit(xml.project.circuit[0]);
	circuit.compile(components, []);
}

run();
