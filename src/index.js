/*
	Ok, this is the core module. We need the following:
		- a 'universe', in which deltas exist
			- has an FQN
			- can export all used relations
			- (eventually) can alias imported relations for disambiguation

		- a way to create deltas into the universe
			- "The universe changed such that:
				- the <property_name> of a <pointer_name> referred to as <entity_reference>,
				- <repeat for all other pointer values on the delta>,
				- have all been updated."

		- a way to query deltas out of the universe
			- GraphQL is a really obvious way to do this, but I don't want to couple
				this library to GraphQL so fundamentally. That'll be a module where the
				GraphQL resolvers are just pass-throughs to what gets built here.
			- Need a way to say: "Give me the entity <entity_reference> and apply these
				nested queries to its nested values recursively until you've terminated."
*/

const { createUniverse } = require('./universe');
const { createDelta } = require('./delta.js')

module.exports = {
	createUniverse,
	createDelta
}
