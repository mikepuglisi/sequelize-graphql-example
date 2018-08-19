
const { GraphQLServer, MockList, GraphQLTools } = require('graphql-yoga');
const {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLUUID
} = require('graphql-custom-types');
const casual = require('casual');
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize');
const { resolver } = require('graphql-sequelize');
const models = require('./models');
// const typeDefs = require('./schema');



// const typeDefs = `
//   type Query {
//     pet(id: ID!): Pet
//     pets: [Pet]
//     user(id: ID!): User
//     users: [User]
//   }

//   type User {
//     id: ID!
//     name: String
//     pets: [Pet]
//   }

//   type Pet {
//     id: ID!
//     name: String
//     owner: User
//   }
// `;

const resolvers = {
  Query: {
    pet: resolver(models.Pet),
    pets: resolver(models.Pet),
    user: resolver(models.User),
    users: resolver(models.User),
    places: resolver(models.Place),
  },
  User: {
    pets: resolver(models.User.Pets),
  },
  Pet: {
    owner: resolver(models.Pet.Owner),
  },
};

// Tell `graphql-sequelize` where to find the DataLoader context in the
// global request context
resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY };

const mocks = {
  String: () => 'It works!',
  Money: () => Math.floor(Math.random() * (200.00 - 100.00 + 100.00)) + 100.00,
  GraphQLURL: () => `${casual.url}${casual.word}.png`,
  Query: () => ({
    places: () => {
      return new MockList([1, 7])
    },
    users: (root, args) => {
      return new MockList([1, 7])
    },
    amenities: (root, args) => {
      return new MockList([1, 4])
    },    
  }),
  Place: () => ({ title: casual.title, description: casual.description, address: casual.address }),
  Location: () => ({ address: casual.address, city: casual.city, state: casual.state_abbr, country: 'US' }),
  User: () => ({ name: casual.first_name, email: casual.email }),
  Amenity: () => ({ name: casual.word, description: casual.description }),
  Pet: () => ({ name: casual.first_name }),
  Author: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',  
  resolvers,
  mocks: false,
  context(req) {
    // For each request, create a DataLoader context for Sequelize to use
    const dataloaderContext = createContext(models.sequelize);

    // Using the same EXPECTED_OPTIONS_KEY, store the DataLoader context
    // in the global request context
    return {
      [EXPECTED_OPTIONS_KEY]: dataloaderContext,
    };
  },
});

module.exports = server;
