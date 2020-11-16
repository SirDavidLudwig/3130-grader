import assert from "assert";

/**
 * Merge two signals together, yielding error signals in conflicting bits
 */
export function merge(a: number[], b: number[]) {
	assert(a.length == b.length, "Merge error: a and b must have the same length!");
	let result = [];
	for (let i = 0; i < a.length; i++) {
		if (a[i] == b[i]) {
			result.push(a[i]);
		} else {
			result.push(-1);
		}
	}
	return result;
}
