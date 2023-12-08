import axios from 'axios'
import {QueryStringModel} from '../../base_models/QueryString'
import {ServiceFormatQueryString} from '../formatter/queryStringFilter'
import { ResponseModel } from '../../_metronic/helpers'

export async function ServiceGetOneByParams<T>(
  collection: string,
  params?: QueryStringModel
): Promise<ResponseModel<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL || ''
      const apiVersion: string = process.env.REACT_APP_API_VERSION || ''
      const queryParams: string = ServiceFormatQueryString(params)
      const url: string = `${apiBaseUrl}/${apiVersion}/${collection}?${queryParams || ''}`
      const response: ResponseModel<T> = await axios.get(url)
      return resolve(response)
    } catch (err) {
      return reject(err)
    }
  })
}
