import path from 'path';
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import {
    GraphQLEmail,
    GraphQLURL,
    GraphQLDateTime,
    GraphQLLimitedString,
    GraphQLPassword,
    GraphQLUUID
  } from 'graphql-custom-types';

const typesArray = fileLoader(path.join(__dirname, "./"), { recursive: true });
const typeDefs = mergeTypes(typesArray, { all: true });

export default typeDefs;