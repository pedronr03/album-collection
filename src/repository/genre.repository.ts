import UpdateGenreDto from './dto/genre/update-genre-dto';
import CreateGenreDto from './dto/genre/create-genre-dto';
import { ApolloError } from 'apollo-server';
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import connection from "../database";
import Genre from './entities/Genre';

class GenreRepository {
  getAll = async (): Promise<Genre[]> => {
    const query = `SELECT * FROM Genre;`;
    const [genres] = await connection.execute<RowDataPacket[]>(query);
    return genres as Genre[];
  };

  getById = async (id: number): Promise<Genre> => {
    const query = `SELECT * FROM Genre
    WHERE id = ?;`;
    const params = [id];
    const [[genre]] = await connection.execute<RowDataPacket[]>(query, params);
    if (!genre) throw new ApolloError('Genre not found', 'NOT_FOUND');
    return genre as Genre;
  };

  create = async (createGenreDto: CreateGenreDto): Promise<Genre> => {
    const query = `INSERT INTO Genre (name)
    VALUES (?);`;
    const params = [createGenreDto.name];
    const [{ insertId: id }] = await connection.query<ResultSetHeader>(query, params);
    const newGenre = { id, ...createGenreDto };
    return newGenre;
  };

  update = async (updateGenreDto: UpdateGenreDto): Promise<Genre> => {
    const genreSearch = await this.getById(updateGenreDto.id);
    const updatedGenre = { ...genreSearch, ...updateGenreDto };
    const { id, name } = updatedGenre;
    const query = `UPDATE Genre
    SET name = ?
    WHERE id = ?;`;
    const params = [name, id];
    await connection.query<ResultSetHeader>(query, params);
    return updatedGenre;
  };

  delete = async (id: number): Promise<Genre> => {
    const genreSearch = await this.getById(id);
    const query = `DELETE FROM Genre WHERE id = ?;`;
    const params = [id];
    await connection.query<ResultSetHeader>(query, params);
    return genreSearch;
  }
}

export default GenreRepository;