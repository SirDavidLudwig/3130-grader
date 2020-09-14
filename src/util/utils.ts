/**
 * Autobind methods in the given class instance.
 * https://github.com/kodefox/class-autobind/blob/master/src/autobind.js
 *
 * @param instance The object instance to bind
 * @param proto    [Optional] The prototype of the binding object
 */
export function autobind(instance: object, proto?: object) {
	interface PropertyContainer {
		[key: string]: any
	}
	if (proto == null) {
		proto = Object.getPrototypeOf(instance);
	}
	let propertyNames = Object.getOwnPropertyNames(proto);
	for (let name of propertyNames) {
		let value: any = (<PropertyContainer>proto)[name];
		if (typeof value === "function") {
			(<PropertyContainer>instance)[name] = (<PropertyContainer>proto)[name].bind(instance);
		}
	}
}
