import 'dotenv/config';
import { ApolloServer } from "apollo-server";
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen({ port })
    .then(({ url }) => console.log(`Server running on: ${url}`));
}

bootstrap();
