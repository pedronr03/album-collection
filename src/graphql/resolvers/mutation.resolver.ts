import AlbumRepository from "../../repository/album.repository";
import CreateAlbumDto from "../../repository/dto/album/create-album-dto";
import UpdateAlbumDto from "../../repository/dto/album/update-album-dto";

const Mutation = {
  createAlbum(_root: undefined, args: { albumData: CreateAlbumDto }) {
    const albumRepository = new AlbumRepository();
    return albumRepository.create(args.albumData);
  },
  updateAlbum(_root: undefined, args: { albumData: UpdateAlbumDto }) {
    const albumRepository = new AlbumRepository();
    return albumRepository.update(args.albumData);
  },
  deleteAlbum(_root: undefined, args: { id: number }) {
    const albumRepository = new AlbumRepository();
    return albumRepository.delete(args.id);
  }
};

export default Mutation;
