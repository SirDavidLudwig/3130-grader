import { Network } from "./Network";

/**
 * A connector can probe the connected network or emit signals onto the network.
 * Events triggered via emit trigger network updates.
 */
export class Connector {

	/**
	 * Store the network that this connector is connected to
	 */
	protected network: Network | null = null;

	/**
	 * The value currently being emitted onto the network by this connector
	 */
	protected emitting: number[] | null = null;

	/**
	 * The relative position of the connector
	 */
	protected position: [number, number] = [0, 0];

	/**
	 * Create a connector
	 */
	public constructor(position?: [number, number]) {
		this.position = position || this.position;
	}

	/**
	 * Connect this connector to a wire network
	 */
	public connect(network: Network) {
		this.network = network;
	}

	/**
	 * Emit a value into the connected network
	 */
	public emitSignal(value: number[] | null) {
		this.emitting = value;
		if (this.network) {
			this.network.scheduleUpdate(this);
		}
	}

	/**
	 * Probe the network for the current value
	 *
	 * @param emitting get the value this connector is currently emitting
	 */
	public probe(emitting: boolean = false) {
		if (emitting || this.emitting != null) {
			return this.emitting;
		}
		if (this.network === null) {
			return null;
		}
		return this.network.probe();
	}
}
