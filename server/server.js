import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  {
    id: "1",
    name: "Delectus Autem",
    age: 30,
    isMarried: true,
  },
  {
    id: "2",
    name: "Quis Facilis",
    age: 25,
    isMarried: false,
  },
  {
    id: "3",
    name: "Fugiat Smith",
    age: 28,
    isMarried: false,
  },
];

const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, age: Int!, isMarried: Boolean!): User
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at: ${url}`);
