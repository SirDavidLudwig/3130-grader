import Component from "./Component";
import { Connector } from "../wiring/Connector";
import { IComponentXml } from "../interfaces";

export class Pin extends Component
{
	public static readonly NAME: string = "Pin";

	protected createConnectors(addConnector: (pos?: [number, number]) => Connector): void {
		let connector = addConnector([0, 0]);
		connector.emitSignal([0]);
	}
}
