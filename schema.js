const axios = require('axios')
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema,
} = require('graphql')

// Launch Type (OBJECT TYPE)
const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: () => ({
		id: { type: GraphQLString },
		flight_number: { type: GraphQLInt },
		name: { type: GraphQLString },
		date_utc: { type: GraphQLString },
		date_local: { type: GraphQLString },
		success: { type: GraphQLBoolean },
		rocket: { type: GraphQLString },
	}),
})

// Rocket Type (OBJECT TYPE)
const RocketType = new GraphQLObjectType({
	name: 'Rocket',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		type: { type: GraphQLString },
	}),
})

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		launches: {
			type: new GraphQLList(LaunchType),
			async resolve(parent, args) {
				return await axios
					.get('https://api.spacexdata.com/v4/launches/')
					.then((res) => res.data)
			},
		},
		launch: {
			type: LaunchType,
			args: {
				id: { type: GraphQLString },
			},
			async resolve(parent, args) {
				return await axios
					.get(`https://api.spacexdata.com/v4/launches/${args.id}`)
					.then((res) => res.data)
			},
		},
		rockets: {
			type: new GraphQLList(RocketType),
			async resolve(parent, args) {
				return await axios
					.get('https://api.spacexdata.com/v4/rockets/')
					.then((res) => res.data)
			},
		},
		rocket: {
			type: RocketType,
			args: {
				id: { type: GraphQLString },
			},
			async resolve(parent, args) {
				return await axios
					.get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
					.then((res) => res.data)
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})
