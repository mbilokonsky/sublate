const { createStore } = require('./store.js')

module.exports = {
	createUniverse: () => {
		const history = createStore();
		const write = history.write;
		const query = history.query;
		const status = () => ({
			size: history.length,
		})

		return {
			write,
			query,
			status
		}
	}
}
