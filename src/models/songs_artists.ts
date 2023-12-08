import { ID } from "../_metronic/helpers"

export interface songs_artists{
    id?: ID
    songs_id: number | string
    artists_id: number | string
}
export const InitialValue = {
    songs_id: '',
    artists_id: ''
  }