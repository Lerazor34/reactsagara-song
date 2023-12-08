import {FC} from 'react'
import {Route, Routes, useParams} from 'react-router-dom'
import {CreateWrapper} from '../pages/create/CreateWrapper'
import EditWrapper from '../pages/edit/EditWrapper'
import {ListWrapper} from '../pages/list/ListWrapper'
import ReadWrapper from '../pages/read/ReadWrapper'
import {Wrapper} from '../Wrapper'
import {PageLink,PageTitle} from '../../../_metronic/layout/core';
import { useFormatter } from '../../../hooks/useFormatter'



const IndexRoutes: FC = () => {
  
  // const routeParams = useParams()
  // console.log(routeParams);
  // const {collection} = routeParams

  const collection = 'genres'
  const { capitalizeFormatUndescoreString } = useFormatter()

  const breadcrumbs: Array<PageLink> = [
    {
      title: `${capitalizeFormatUndescoreString(collection)}`,
      path: `page/${collection}/list`,
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

   return (
    <Routes>
      <Route element={<Wrapper collection={collection?collection: ""} />}>
        <Route path='/' element={
          <>
              <PageTitle breadcrumbs={breadcrumbs}>List</PageTitle>
              <ListWrapper />
          </>
        } />
        <Route path='create' element={
          <>
            <PageTitle breadcrumbs={breadcrumbs}>Create</PageTitle>
            <CreateWrapper />
          </>
        
        } />
        <Route path=':id'>
          <Route index element={
           <>
              <PageTitle breadcrumbs={breadcrumbs}>Detail</PageTitle>
              <ReadWrapper />
           </>
          
          } />
          <Route path='edit' element={
            <>
              <PageTitle breadcrumbs={breadcrumbs}>Edit</PageTitle>
              <EditWrapper />
            </>
          } />
        </Route>
      </Route>
    </Routes>
  )
}

export default IndexRoutes
