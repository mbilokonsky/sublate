const { createUniverse, createDelta } = require("../src")

describe('The whole system', ()=> {
	describe('createUniverse', () => {
		let universe;
		beforeEach(() => {
			universe = createUniverse();
		})
		it('a `write` method', () => {
			expect(typeof universe.write).toBe('function')
		})
		it('a `query` method', () => {
			expect(typeof universe.write).toBe('function')
		})
		it('a `status` method', () => {
			expect(typeof universe.status).toBe('function')
		})
	})
	describe('createDelta', ()=> {
		it('takes a pointers object and adds an id and a timestamp', () => {
			let pointers = {
				human: { target: 'myk', context: 'employer' },
				company: { target: 'artsy', context: 'employees' }
			}
			let delta = createDelta(pointers);
			expect(delta.id).not.toBeNull()
			expect(typeof delta.timestamp).toBe('string')
			expect(JSON.stringify(delta.pointers)).toBe(JSON.stringify(pointers))
		})
	})
})
