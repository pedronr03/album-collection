import AlbumRepository from "../../repository/album.repository";

const Query = {
  getAlbums() {
    const albumRepository = new AlbumRepository();
    return albumRepository.getAll();
  },
  getAlbum(_root: undefined, args: { id: number }) {
    const albumRepository = new AlbumRepository();
    return albumRepository.getById(args.id);
  },
};

export default Query;