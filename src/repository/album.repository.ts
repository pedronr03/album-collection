import { ApolloError } from "apollo-server";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import connection from "../database";
import CreateAlbumDto from "./dto/album/create-album-dto";
import UpdateAlbumDto from "./dto/album/update-album-dto";
import Album from "./entities/Album";

class AlbumRepository {
  getAll = async (): Promise<Album[]> => {
    const query = `SELECT * FROM Album;`;
    const [albums] = await connection.execute<RowDataPacket[]>(query);
    return albums as Album[];
  };

  getById = async (id: number): Promise<Album> => {
    const query = `SELECT * FROM Album
    WHERE id = ?;`;
    const params = [id];
    const [[album]] = await connection.execute<RowDataPacket[]>(query, params);
    if (!album) throw new ApolloError('Album not found', 'NOT_FOUND');
    return album as Album;
  };

  create = async (createAlbumDto: CreateAlbumDto): Promise<Album> => {
    const { artistId, genreId, releasedAt, title } = createAlbumDto;
    await this.verifyForeignKeys(artistId, genreId);
    const query = `INSERT INTO Album (title, releasedAt, artistId, genreId)
    VALUES (?, ?, ?, ?);`;
    const fixReleasedAt = new Date(releasedAt);
    if (!fixReleasedAt.getDate()) throw new ApolloError('Invalid date', 'UNAUTHORIZED');
    const params = [title, fixReleasedAt, artistId, genreId];
    const [{ insertId: id }] = await connection.query<ResultSetHeader>(query, params);
    const newAlbum = { id, ...createAlbumDto };
    return newAlbum;
  };

  update = async (updateAlbumDto: UpdateAlbumDto): Promise<Album> => {
    const albumSearch = await this.getById(updateAlbumDto.id);
    let updatedAlbum = { ...albumSearch, ...updateAlbumDto };
    updatedAlbum.releasedAt = new Date(updatedAlbum.releasedAt);
    const { title, releasedAt, artistId, genreId, id } = updatedAlbum;
    await this.verifyForeignKeys(artistId, genreId);
    const query = `UPDATE Album
    SET title = ?,
    releasedAt = ?,
    artistId = ?,
    genreId = ?
    WHERE id = ?;`;
    const params = [title, releasedAt, artistId, genreId, id];
    await connection.query<ResultSetHeader>(query, params);
    return updatedAlbum;
  };

  delete = async (id: number): Promise<Album> => {
    const albumSearch = await this.getById(id);
    const query = `DELETE FROM Album WHERE id = ?;`;
    const params = [id];
    await connection.query<ResultSetHeader>(query, params);
    return albumSearch;
  };

  verifyForeignKeys = async (artistId: number, genreId: number) => {
    const query1 = `SELECT * FROM Artist WHERE id = ?;`;
    const params1 = [artistId];
    const [[artist]] = await connection.execute<RowDataPacket[]>(query1, params1);
    if (!artist) throw new ApolloError('Artist not found', 'NOT_FOUND');
    const query2 = `SELECT * FROM Genre WHERE id = ?;`;
    const params2 = [genreId];
    const [[genre]] = await connection.execute<RowDataPacket[]>(query2, params2);
    if (!genre) throw new ApolloError('Genre not found', 'NOT_FOUND');
  } 
}

export default AlbumRepository;