import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { worker } from "./mocks/browser"

import { routues } from "@/pages/Router.tsx"

if (process.env.NODE_ENV === "development") {
  worker.start()
}

const router = createBrowserRouter(routues)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
