import Album from "./album.resolver";
import Mutation from "./mutation.resolver";
import Query from "./query.resolver";
import Song from "./song.resolver";

const resolvers = {
  Query,
  Album,
  Song,
  Mutation
};

export default resolvers;