import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import Header from '../components/vendors/Header'
import Sidebar from '../components/vendors/Sidebar'
import ThemedSuspense from '../components/vendors/ThemedSuspense'
import Main from '../containers/Main'
import { SidebarContext } from '../context/SidebarContext'
import routes from '../routes'
const Page404 = lazy(() => import('../pages/vendors/404'))
function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()
  useEffect(() => {
    closeSidebar()
  }, [location])
  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
      <Sidebar />

      <div className='flex flex-col flex-1 w-full'>
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                const { path, component: Component } = route

                return Component ? (
                  <Route key={i} exact={true} path={`/app${path}`} render={(props: any) => <Component {...props} />} />
                ) : null
              })}
              <Redirect exact from='/app' to='/app/dashboard' />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  )
}
export default Layout
