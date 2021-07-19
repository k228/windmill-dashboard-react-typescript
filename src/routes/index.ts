import { lazy } from 'react'
// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/vendors/Dashboard'))
const Forms = lazy(() => import('../pages/vendors/Forms'))
const Cards = lazy(() => import('../pages/vendors/Cards'))
const Charts = lazy(() => import('../pages/vendors/Charts'))
const Buttons = lazy(() => import('../pages/vendors/Buttons'))
const Modals = lazy(() => import('../pages/vendors/Modals'))
const Tables = lazy(() => import('../pages/vendors/Tables'))
const Page404 = lazy(() => import('../pages/vendors/404'))
const Blank = lazy(() => import('../pages/vendors/Blank'))
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */

const routes: Array<{ path: string; component: React.LazyExoticComponent<() => JSX.Element> }> = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]
export default routes
