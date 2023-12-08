import { ID } from "../_metronic/helpers"

export interface addsongsmodel{
    id?: ID
    Name: string
    genres_id: string | number
    artists_id: string | number
    publishedDate: Date | string
}
export const InitialValue = {
    Name: '',
    genres_id: '',
    artists_id: '',
    publishedDate: '',
  }