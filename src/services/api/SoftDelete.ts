import axios from 'axios'
import {ID, ResponseModel} from '../../_metronic/helpers'

export async function ServiceSoftDelete<T>(
  collection: string,
  id: ID | string
): Promise<ResponseModel<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL || ''
      const apiVersion: string = process.env.REACT_APP_API_VERSION || ''
      const url: string = `${apiBaseUrl}/${apiVersion}/${collection}/${id}/delete`
      const response: ResponseModel<T> = await axios.put(url)
      return resolve(response)
    } catch (err) {
      return reject(err)
    }
  })
}
