const { createStore } = require('../src/store')
const { createDelta } = require('../src/delta')

describe('sublate store', () => {
	let store;
	beforeEach(() => {
		store = createStore();
	})

	describe('allows users to write deltas', () => {
		let delta1, delta2;
		beforeEach(() => {
			delta1 = createDelta({
				human: { target: "myk", context: "employer" },
				company: { target: "artsy", context: "employees" }
			})
			delta2 = createDelta({
				human: { target: "myk", context: "age" },
				number: { target: 36, context: "people_this_age" }
			})
			store.write(delta1)
			store.write(delta2)
		})
		it('pushes the delta into the canon', () => {
			expect(store.$debug().canon[0]).toBe(delta1)
		});

		it('updates the by_guid index', () => {
			const index1 = store.$debug().by_id[delta1.id];
			const index2 = store.$debug().by_id[delta2.id];
			expect(index1).toBe(0)
			expect(index2).toBe(1)
		});

		it('updates the by_reference index', () => {
			const debug = store.$debug();
			const index_myk = debug.by_target["myk"]
			const index_artsy = debug.by_target["artsy"]
			const index_36 = debug.by_target[36]

			expect(index_myk.length).toBe(2)
			expect(index_artsy.length).toBe(1)
			expect(index_36.length).toBe(1)

			expect(index_artsy[0]).toBe(0)
			expect(index_36[0]).toBe(1)
		});
	});

	describe('allows users to write queries', () => {
		let delta1, delta2;
		beforeEach(() => {
			delta1 = createDelta({
				human: { target: "myk", context: "employer" },
				company: { target: "artsy", context: "employees" }
			})
			delta2 = createDelta({
				human: { target: "myk", context: "age" },
				number: { target: 36, context: "people_this_age" }
			})
			store.write(delta1)
			store.write(delta2)
		})

		it('supports lookup by reference', () => {
			let {deltas, result} = store.query('myk');
			expect(deltas.length).toBe(2)
			expect(result.age[0]).toBe(delta2)
			expect(result.employer[0]).toBe(delta1)
		})
	})
})
