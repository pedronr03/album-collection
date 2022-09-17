import { CreateArtistDto } from './../../repository/dto/artist/create-artist-dto';
import AlbumRepository from "../../repository/album.repository";
import CreateAlbumDto from "../../repository/dto/album/create-album-dto";
import UpdateAlbumDto from "../../repository/dto/album/update-album-dto";
import ArtistRepository from '../../repository/artist.repository';
import { UpdateArtistDto } from '../../repository/dto/artist/update-artist-dto';

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
  },
  createArtist(_root: undefined, args: { artistData: CreateArtistDto }) {
    const artistRepository = new ArtistRepository();
    return artistRepository.create(args.artistData);
  },
  updateArtist(_root: undefined, args: { artistData: UpdateArtistDto }) {
    const artistRepository = new ArtistRepository();
    return artistRepository.update(args.artistData);
  },
  deleteArtist(_root: undefined, args: { id: number }) {
    const artistRepository = new ArtistRepository();
    return artistRepository.delete(args.id);
  }
};

export default Mutation;
