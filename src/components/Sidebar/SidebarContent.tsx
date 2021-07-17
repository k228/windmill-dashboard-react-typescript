import { Button } from '@windmill/react-ui'
import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import routes from '../../routes/sidebar'
import SidebarSubmenu from './SidebarSubmenu'
function Icon({ icon, ...props }: any) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}
function SidebarContent() {
  return (
    <div className='py-4 text-gray-500 dark:text-gray-400'>
      <a className='ms-6 text-lg font-bold text-gray-800 dark:text-gray-200' href='#'>
        Windmill
      </a>
      <ul className='mt-6'>
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className='relative px-6 py-3' key={route.name}>
              <NavLink
                exact
                to={route.path}
                className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                activeClassName='text-gray-800 dark:text-gray-100'
              >
                <Route path={route.path} exact={route.exact}>
                  <span className='absolute inset-y-0 more-start-8 start-0 w-1 bg-purple-600 rounded-te-lg rounded-be-lg' aria-hidden='true'></span>
                </Route>
                <Icon className='w-5 h-5' aria-hidden='true' icon={route.icon} />
                <span className='ms-4'>{route.name}</span>
              </NavLink>
            </li>
          ),
        )}
      </ul>
      <div className='px-6 my-6'>
        <Button>
          Create account
          <span className='ms-2' aria-hidden='true'>
            +
          </span>
        </Button>
      </div>
    </div>
  )
}
export default SidebarContent
