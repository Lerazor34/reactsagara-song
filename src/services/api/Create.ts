import axios from 'axios'
import {ResponseModel} from '../../_metronic/helpers'

export async function ServiceCreate<T>(collection: string, payload: T): Promise<ResponseModel<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL || ''
      const apiVersion: string = process.env.REACT_APP_API_VERSION || ''
      const url: string = `${apiBaseUrl}/${apiVersion}/${collection}`
      const response: ResponseModel<T> = await axios.post(url, payload)
      return resolve(response)
    } catch (err) {
      return reject(err)
    }
  })
}
