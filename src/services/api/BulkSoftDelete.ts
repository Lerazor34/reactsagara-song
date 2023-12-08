import axios from 'axios'
import {ID, ResponseModel} from '../../_metronic/helpers'
import {ServiceArrayStringToString} from '../formatter/string'

export async function ServiceBulkSoftDelete<T>(
  collection: string,
  id: ID[] | string[]
): Promise<ResponseModel<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL || ''
      const apiVersion: string = process.env.REACT_APP_API_VERSION || ''
      const ids: string = ServiceArrayStringToString(id)
      const url: string = `${apiBaseUrl}/${apiVersion}/${collection}/${ids}`
      const response: ResponseModel<T> = await axios.put(url)
      return resolve(response)
    } catch (err) {
      return reject(err)
    }
  })
}
