import { Windmill } from '@windmill/react-ui'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/css/tailwind.css'
import ThemedSuspense from './components/vendors/ThemedSuspense'
import { SidebarProvider } from './context/SidebarContext'
import { Provider } from 'react-redux';
import {store} from "./store/store"
import {ToastProvider} from "react-toast-notifications";
import CustomToast from "./components/vendors/CustomToast";
// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }
ReactDOM.render(
    <Provider store={store}>
        <SidebarProvider>
            <Suspense fallback={<ThemedSuspense />}>
              <Windmill usePreferences>
                  <ToastProvider components={{ Toast: CustomToast }}>
                <App />
                  </ToastProvider>
              </Windmill>
            </Suspense>
        </SidebarProvider>
    </Provider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
