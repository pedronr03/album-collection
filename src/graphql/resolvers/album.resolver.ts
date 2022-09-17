import ArtistRepository from "../../repository/artist.repository";
import Album from "../../repository/entities/Album";
import GenreRepository from "../../repository/genre.repository";

const Album = {
  artist: (root: Album) => {
    const artistRepository = new ArtistRepository();
    return artistRepository.getById(root.artistId);
  },
  genre: (root: Album) => {
    const genreRepository = new GenreRepository();
    return genreRepository.getById(root.genreId);
  }
};

export default Album;