import AlbumRepository from "../../repository/album.repository";
import ArtistRepository from "../../repository/artist.repository";

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
  }
};

export default Query;