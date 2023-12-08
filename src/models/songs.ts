import { ID } from "../_metronic/helpers"

export interface songs{
    id?: ID
    Name: string
    genres_id: string | number
    publishedDate: Date | string
}
export const InitialValue = {
    Name: '',
    genres_id: '',
    publishedDate: '',
  }