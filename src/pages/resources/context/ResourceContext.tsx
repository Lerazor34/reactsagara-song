import {FC, createContext, useContext, useState} from 'react'
import {ResourceContextModel, state} from '../../../base_models/ResourceContext'
import {WithChildren} from '../../../_metronic/helpers'
import {useParams} from 'react-router-dom'

const Context = createContext<ResourceContextModel>(state)

const ResourceProvider: FC<WithChildren> = ({children}) => {
  const routeParams = useParams()
  const [collection, setCollection] = useState<string>(routeParams.collection || '')

  const updateCollection = (name: string) => {
    setCollection(name)
  }

  return (
    <Context.Provider
      value={{
        collection,
        updateCollection,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useResourceContext = () => useContext(Context)

export {ResourceProvider, useResourceContext}
