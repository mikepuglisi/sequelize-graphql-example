
import { GraphQLServer, MockList } from 'graphql-yoga';
import casual from 'casual';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import { resolver } from 'graphql-sequelize';
import models from './models';
import typeDefs from './schema';



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
    properties: resolver(models.Property),
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
  Query: () => ({
    properties: () => {
      return new MockList([1, 7])
    },
    users: (root, args) => {
      return new MockList([1, 7])
    },
    
  }),
  Property: () => ({ address: casual.address }),
  User: () => ({ name: casual.first_name, email: casual.email }),
  Pet: () => ({ name: casual.first_name }),
  Author: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};

const server = new GraphQLServer({
  typeDefs,
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

export default server;
