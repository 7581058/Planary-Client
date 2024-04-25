import './configs/recoil'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { routues } from '@/pages/Router.tsx'
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start()
}

const router = createBrowserRouter(routues)

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </React.StrictMode>,
  )
})
