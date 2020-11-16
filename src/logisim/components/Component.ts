import assert from "assert";
import { autobind } from "../../util/utils";
import { Facing } from "../enums";
import { IAttributeXml, IComponentXml } from "../interfaces";
import { Connector } from "../wiring/Connector";

/**
 * Allow component class definitions to be passed as arguments
 */
export interface IComponentType {
	new (xml: IComponentXml): Component;
};

/**
 * Store a mapping of all components
 */
export interface IComponentMap {
	[name: string]: IComponentType;
};

/**
 * Store a mapping of all connectors
 */
export interface IConnectorMap {
	input : Connector[];
	output: Connector[];
};

export interface IAttributeMap {
	[name: string]: (value: string) => void;
};

export default class Component
{
	/**
	 * The name of the component
	 */
	public static readonly NAME: string = "";

	/**
	 * The position of the component
	 */
	public position: [number, number] = [0, 0];

	/**
	 * The orientation of the component
	 */
	public facing: Facing = Facing.East;

	/**
	 * The list of connectors for this component
	 */
	protected connectors: Connector[] = [];

	/**
	 * The component constructor. Do not override!
	 */
	public constructor(xml: IComponentXml) {
		// Map out the attribute handlers
		let attributeMap: IAttributeMap = {};
		for (let attribute of xml.a) {
			this.mapAttributes(attributeMap);
		}

		// Handle each of the attributes
		this.handleAttributes(xml.a, attributeMap);

		// Create the connectors
		this.createConnectors(() => this.addConnector());
	}

	/**
	 * Handle all attributes in the given component XML
	 */
	protected handleAttributes(xml: IAttributeXml[], map: IAttributeMap) {
		for (let attr of xml) {
			if (attr.name in map) {
				map[attr.name](attr.value);
			}
		}
	}

	/**
	 * Add a connector to the component
	 */
	protected addConnector() {
		let connector = new Connector();
		this.connectors.push(connector);
		return connector;
	}

	// Attribute handling --------------------------------------------------------------------------
	// This stuff should be done with mixins/traits

	/**
	 * Set the direction the component is facing
	 */
	protected setFacing(facing: string) {
		switch (facing) {
			case "West":
				this.facing = Facing.West;
				break;
			case "North":
				this.facing = Facing.North;
				break;
			case "South":
				this.facing = Facing.South;
				break;
			default:
				this.facing = Facing.East;
		}
	}

	// Overridable ---------------------------------------------------------------------------------

	/**
	 * Handle attributes by mapping them to a setter method
	 */
	protected mapAttributes(map: IAttributeMap): void {
		map["facing"] = this.setFacing;
	}

	/**
	 * Create the connectors for the component
	 */
	protected createConnectors(factory: (pos?: [number, number]) => Connector): void {
		// --
	}
}
