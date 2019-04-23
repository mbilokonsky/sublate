const { v4 } = require('uuid');

/*
		this should be typescript so this would be magic, but:
		pointers is an object where the keys are pointer names and the values
		are {target, context} tuples.

		So like:

		createDelta({
			human: { target: "Joe Smith", context: "employer" },
			company: { target: "Smithmart", context: "employee" }
		})
*/
const createDelta = pointers => ({
	id: v4(),
	timestamp: new Date().toISOString(),
	pointers
});

module.exports = {
	createDelta
}
