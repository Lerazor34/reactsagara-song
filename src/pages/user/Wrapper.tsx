import {Outlet} from 'react-router-dom'
import {useFileCheck} from '../../hooks/useModelCheck'
import {Error404} from '../../modules/errors/components/Error404'
import {FC} from 'react'

type props = {
  collection: string
}

export const Wrapper: FC<props> = ({collection}) => {
  const {isModelExist} = useFileCheck()

  try {
    // const {collection} = routeParams
    if (collection) {
      const collectionExist = isModelExist(collection)

      if (collectionExist) {
        return (
          <>
            <Outlet />
          </>
        )
      }
    }
    return <Error404 />
  } catch (e) {
    return <Error404 />
  }
}
