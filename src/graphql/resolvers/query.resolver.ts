import AlbumRepository from "../../repository/album.repository";
import ArtistRepository from "../../repository/artist.repository";
import GenreRepository from "../../repository/genre.repository";
import SongRepository from "../../repository/song.repository";

const Query = {
  getAlbums() {
    const albumRepository = new AlbumRepository();
    return albumRepository.getAll();
  },
  getAlbum(_root: undefined, args: { id: number }) {
    const albumRepository = new AlbumRepository();
    return albumRepository.getById(args.id);
  },
  getArtists() {
    const artistRepository = new ArtistRepository();
    return artistRepository.getAll();
  },
  getArtist(_root: undefined, args: { id: number }) {
    const artistRepository = new ArtistRepository();
    return artistRepository.getById(args.id);
  },
  getGenres() {
    const genreRepository = new GenreRepository();
    return genreRepository.getAll();
  },
  getGenre(_root: undefined, args: { id: number }) {
    const genreRepository = new GenreRepository();
    return genreRepository.getById(args.id);
  },
  getSong(_root: undefined, args: { id: number }) {
    const songRepository = new SongRepository();
    return songRepository.getById(args.id);
  }
};

export default Query;