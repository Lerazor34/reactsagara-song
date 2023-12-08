import axios from 'axios'
import {ResponseModel} from '../../_metronic/helpers'

export async function ServiceGetAllWithQueryString<T>(
  collection: string,
  params?: string
): Promise<ResponseModel<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL || ''
      const apiVersion: string = process.env.REACT_APP_API_VERSION || ''
      const url: string = `${apiBaseUrl}/${apiVersion}/${collection}?${params || ''}`
      const response: ResponseModel<T> = await axios.get(url)
      return resolve(response)
    } catch (err) {
      return reject(err)
    }
  })
}
