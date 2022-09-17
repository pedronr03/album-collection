import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { join } from "path"; 

const typeDefs = loadSchemaSync(join(__dirname, '/*.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

export default typeDefs;