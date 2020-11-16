import Component, { IComponentMap, IComponentType } from "./components/Component";
import { ICircuitXml } from "./interfaces";
import { Facing } from "./enums";

export class Circuit
{
	/**
	 * The name of the circuit
	 */
	public readonly name: string;

	/**
	 * Store the XML that makes up this circuit for compilation purposes
	 */
	protected readonly xml: ICircuitXml;

	/**
	 * Store the component instances
	 */
	protected components: Component[] = [];

	/**
	 * Create a new circuit
	 */
	public constructor(circuit: ICircuitXml) {
		this.xml  = circuit;
		this.name = circuit.$.name;
	}

	/**
	 * Compile the circuit
	 */
	public compile(componentMap: IComponentMap, circuitMap: Circuit[]) {
		this.components = this.createComponents(this.xml, componentMap);
	}

	// ---------------------------------------------------------------------------------------------

	/**
	 * Create the all of the component instances to be added to the circuit
	 */
	protected createComponents(xml: ICircuitXml, componentMap: IComponentMap) {
		let components: Component[] = [];
		for (let component of xml.comp) {
			if (component.$.name in componentMap) {
				components.push(new componentMap[component.$.name](component));
			} else {
				console.log("Component not found:", component.$.name);
			}
		}
		return components;
	}
}
