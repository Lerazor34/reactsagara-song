import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from './_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './_metronic/layout/core'
import {MasterInit} from './_metronic/layout/MasterInit'
import {AuthInit, AuthLocatioMiddleware} from './pages/auth'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <AuthLocatioMiddleware>
              <Outlet />
              <MasterInit />
            </AuthLocatioMiddleware>
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
