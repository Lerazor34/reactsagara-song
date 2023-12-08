import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../_metronic/assets/ts/_utils'
import {WithChildren} from '../_metronic/helpers'
// import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'


const PrivateRoutes = () => {
  
  const UserPage = lazy(() => import('../pages/user/router/IndexRoutes'))
  const SysparamPage = lazy(() => import('../pages/sysparams/router/IndexRoutes'));
  const RolePage = lazy(()=> import('../pages/roles/router/IndexRoutes'));
  const PrivilegePage = lazy(()=> import('../pages/privileges/router/IndexRoutes'));
  const SongsPage = lazy(()=> import('../pages/songs/router/IndexRoutes'));
  const GenresPage = lazy(()=> import('../pages/genres/router/IndexRoutes'));
  const ArtistsPage = lazy(()=> import('../pages/artists/router/IndexRoutes'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='user/*'
          element={
            <SuspensedView>
              <UserPage />
            </SuspensedView>
          }
        />

        <Route
          path='sysparams/*'
          element={
            <SuspensedView>
              <SysparamPage />
            </SuspensedView>
          }
        />

        <Route
          path='roles/*'
          element={
            <SuspensedView>
              <RolePage />
            </SuspensedView>
          }
        />

        <Route
          path='Privilege/*'
          element={
            <SuspensedView>
              <PrivilegePage/>
            </SuspensedView>
          }
        />

        <Route
          path='songs/*'
          element={
            <SuspensedView>
              <SongsPage/>
            </SuspensedView>
          }
        />

        <Route
          path='genres/*'
          element={
            <SuspensedView>
              <GenresPage/>
            </SuspensedView>
          }
        />

        <Route
          path='artists/*'
          element={
            <SuspensedView>
              <ArtistsPage/>
            </SuspensedView>
          }
        />
       
        {/* <Route path=':collection' element={<ResourceWrapper />}>
          <Route index element={<ListWrapper />} />
          <Route path='create' element={<CreateWrapper />} />
          <Route path=':id'>
            <Route index element={<ReadWrapper />} />
            <Route path='edit' element={<EditWrapper />} />
          </Route>
        </Route> */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
