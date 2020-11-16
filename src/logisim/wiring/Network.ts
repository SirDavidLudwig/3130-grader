import { Connector } from "./Connector";
import * as logic from "../logic";

/**
 * The network maintains connections to directly-connected components
 */
export class Network
{
	/**
	 * The signal currently emitted on the network
	 */
	protected signal?: number[] | null;

	/**
	 * Indicate that the network has been updated
	 */
	protected isDirty: boolean = false;

	/**
	 * Maintain the list of connectors in the network
	 */
	protected connectors: Connector[] = [];

	/**
	 * Maintain a list of scheduled updates
	 */
	protected scheduledUpdates = new Set<Connector>();

	/**
	 * Schedule a new network update
	 */
	public scheduleUpdate(connector: Connector) {
		// this.scheduledUpdates.add(connector);
		this.isDirty = true;
	}

	/**
	 * Determine the signal on this network
	 */
	public probe() {
		if (this.signal === undefined) {
			this.signal = null;
			for (let connector of this.connectors) {
				let value = connector.probe(true);
				if (value !== null) {
					if (this.signal === null) {
						this.signal = <number[]|null>value;
					} else {
						this.signal = logic.merge(value, this.signal);
					}
				}
			}
		}
		return this.signal;
	}

	/**
	 * Update the network
	 */
	public update() {
		this.signal = undefined;
	}
}
