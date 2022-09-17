import UpdateArtistDto from './dto/artist/update-artist-dto';
import CreateArtistDto from './dto/artist/create-artist-dto';
import { ApolloError } from 'apollo-server';
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import connection from "../database";
import Artist from "./entities/Artist";

class ArtistRepository {
  getAll = async (): Promise<Artist[]> => {
    const query = `SELECT * FROM Artist;`;
    const [artists] = await connection.execute<RowDataPacket[]>(query);
    return artists as Artist[];
  };

  getById = async (id: number): Promise<Artist> => {
    const query = `SELECT * FROM Artist
    WHERE id = ?;`;
    const params = [id];
    const [[artist]] = await connection.execute<RowDataPacket[]>(query, params);
    if (!artist) throw new ApolloError('Artist not found', 'NOT_FOUND');
    return artist as Artist;
  };

  create = async (createArtistDto: CreateArtistDto): Promise<Artist> => {
    const query = `INSERT INTO Artist (name)
    VALUES (?);`;
    const params = [createArtistDto.name];
    const [{ insertId: id }] = await connection.query<ResultSetHeader>(query, params);
    const newArtist = { id, ...createArtistDto };
    return newArtist;
  };

  update = async (updateArtistDto: UpdateArtistDto): Promise<Artist> => {
    const artistSearch = await this.getById(updateArtistDto.id);
    const updatedArtist = { ...artistSearch, ...updateArtistDto };
    const { id, name } = updatedArtist;
    const query = `UPDATE Artist
    SET name = ?
    WHERE id = ?;`;
    const params = [name, id];
    await connection.query<ResultSetHeader>(query, params);
    return updatedArtist;
  };

  delete = async (id: number): Promise<Artist> => {
    const artistSearch = await this.getById(id);
    const query = `DELETE FROM Artist WHERE id = ?;`;
    const params = [id];
    await connection.query<ResultSetHeader>(query, params);
    return artistSearch;
  }
}

export default ArtistRepository;