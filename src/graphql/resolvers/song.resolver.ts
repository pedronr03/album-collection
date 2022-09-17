import AlbumRepository from "../../repository/album.repository";
import Song from "../../repository/entities/Song";

const Song = {
  album: (root: Song) => {
    const albumRepository = new AlbumRepository();
    return albumRepository.getById(root.albumId);
  }
};

export default Song;