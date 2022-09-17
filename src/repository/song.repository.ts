import { ApolloError } from "apollo-server";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import connection from "../database";
import CreateSongDto from "./dto/song/create-song-dto";
import UpdateSongDto from "./dto/song/update-song-dto";
import Song from "./entities/Song";

class SongRepository {
  getAll = async (): Promise<Song[]> => {
    const query = `SELECT * FROM Song;`;
    const [songs] = await connection.execute<RowDataPacket[]>(query);
    return songs as Song[];
  };

  getById = async (id: number): Promise<Song> => {
    const query = `SELECT * FROM Song
    WHERE id = ?;`;
    const params = [id];
    const [[song]] = await connection.execute<RowDataPacket[]>(query, params);
    if (!song) throw new ApolloError('Song not found', 'NOT_FOUND');
    return song as Song;
  };

  create = async (createSongDto: CreateSongDto): Promise<Song> => {
    const { title, length, albumId } = createSongDto;
    await this.verifyForeignKeys(albumId);
    const query = `INSERT INTO Song (title, length, albumId)
    VALUES (?, ?, ?);`;
    const params = [title, length, albumId];
    const [{ insertId: id }] = await connection.query<ResultSetHeader>(query, params);
    const newSong = { id, ...createSongDto };
    return newSong;
  }

  update = async (updateSongDto: UpdateSongDto): Promise<Song> => {
    const songSearch = await this.getById(updateSongDto.id);
    const updatedSong = { ...songSearch, ...updateSongDto };
    const { title, length, albumId, id } = updatedSong;
    const query = `UPDATE Song
    SET title = ?,
    length = ?,
    albumId = ?
    WHERE id = ?;`;
    const params = [title, length, albumId, id];
    await this.verifyForeignKeys(albumId);
    await connection.query<ResultSetHeader>(query, params);
    return updatedSong;
  };

  delete = async (id: number): Promise<Song> => {
    const songSearch = await this.getById(id);
    const query = `DELETE FROM Song WHERE id = ?;`;
    const params = [id];
    await connection.query<ResultSetHeader>(query, params);
    return songSearch;
  }

  verifyForeignKeys = async (albumId: number) => {
    const query = `SELECT * FROM Album WHERE id = ?;`;
    const params = [albumId];
    const [[album]] = await connection.execute<RowDataPacket[]>(query, params);
    if (!album) throw new ApolloError('Album not found', 'NOT_FOUND');
  }
}

export default SongRepository;