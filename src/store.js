const { integrate } = require('./calculus')

/*
	A store is what provides most of a universe's functionality, but intuitivey
	I want a layer of indirection between them. This may be a mistake.
*/
module.exports = {
	createStore: () => {
		const canon = [];
		let by_id = {};
		let by_target = {};

		// hey myk why are you doing this indirection here we don't need this yet!
		// I know but I want to be always reminding myself that lookups aren't
		//  free, ya know? This is all just proof of concept but I have a pretty
		// 	good feeling about it.
		const rebuild_indexes = () => {
			by_id = {};
			by_target = {};

			canon.forEach((delta, index) => {
				by_id[delta.id] = index;

				let local_index = Object.keys(delta.pointers).reduce((acc, key) => {
					const pointer = delta.pointers[key];
					if (!acc[pointer.target]) {
						acc[pointer.target] = [];
					}
					acc[pointer.target].push(index);
					return acc;
				}, {})

				Object.keys(local_index).forEach(key => {
					if (by_target[key]) {
						by_target[key] = by_target[key].concat(local_index[key])
					} else {
						by_target[key] = local_index[key]
					}
				})
			})
		}

		const write = delta => {
			canon.push(delta)
			rebuild_indexes();
		}

		const query = (reference, cascade) => {
			const deltas = by_target[reference].map(index => canon[index])
			const result = integrate(reference, deltas, cascade)
			return {
				reference,
				deltas,
				result
			}
		}

		const $debug = () => ({
			canon,
			by_id,
			by_target
		})

		return { write, query, $debug }
	}
}
