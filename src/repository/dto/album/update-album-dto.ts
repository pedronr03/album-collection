export default interface UpdateAlbumDto {
  id: number
  title?: string
  releasedAt?: Date
  artistId?: number
  genreId?: number
}