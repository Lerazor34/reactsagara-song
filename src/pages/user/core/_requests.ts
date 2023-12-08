import {QueryStringModel} from '../../../base_models/QueryString'
import {ServiceGetAll} from '../../../services/api/GetAll'
import {ServiceGetAllWithQueryString} from '../../../services/api/GetAllWithQueryString'
import {ID, ResponseModel} from '../../../_metronic/helpers'
import {ServiceSoftDelete} from '../../../services/api/SoftDelete'
import {ServiceBulkSoftDelete} from '../../../services/api/BulkSoftDelete'
import {ServiceCreate} from '../../../services/api/Create'
import {ServiceUpdate} from '../../../services/api/Update'
import {ServiceGetOneById} from '../../../services/api/GetOneById'

export async function get<Type>(
  collection: string,
  params?: QueryStringModel
): Promise<ResponseModel<Type[]>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type[]> = await ServiceGetAll<Type[]>(collection, params)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function getWithQueryString<Type>(
  collection: string,
  params?: string
): Promise<ResponseModel<Type[]>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type[]> = await ServiceGetAllWithQueryString<Type[]>(
        collection,
        params
      )
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function getOneById<Type>(
  collection: string,
  id: string | undefined
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceGetOneById<Type>(collection, id)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function create<Type>(
  collection: string,
  payload: Type
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceCreate<Type>(collection, payload)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function update<Type>(
  collection: string,
  id: string | ID,
  payload: Type
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceUpdate<Type>(collection, id, payload)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function softDelete<Type>(collection: string, id: ID): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceSoftDelete(collection, id)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function bulkSoftDelete<Type>(
  collection: string,
  ids: ID[]
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceBulkSoftDelete(collection, ids)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}
