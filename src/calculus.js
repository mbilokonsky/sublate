const find_root_pointer = (root, pointers) => {
	return Object.keys(pointers).reduce((acc, key) => {
		if (acc) { return acc; }
		let pointer = pointers[key];
		if (pointer.target === root) { return pointer }
	}, null)
}

module.exports = {
	integrate: (root, deltas, cascade) => {
		return deltas.reduce((output, delta) => {
			// 1. iterate through each pointer to find the one pointing at root.
			// 2. MAKE SURE THIS POINTER EXISTS, else return
			// 3. output[ROOT_POINTER.context] = delta
			const root_pointer = find_root_pointer(root, delta.pointers);
			if (!root_pointer) { return output; }
			if (!output[root_pointer.context]) { output[root_pointer.context] = [] }
			output[root_pointer.context].push(delta)
			return output;
		}, {})
	},
	differentiate: object => {
		return [];
	}
}
