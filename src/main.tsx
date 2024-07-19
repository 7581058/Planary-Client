import './configs/recoil'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { routues } from '@/pages/Router.tsx'

async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_USE_BACKEND) {
    worker.start()
    console.log('MSW enabled for development environment.')
  } else {
    console.log('MSW not enabled.')
  }
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
