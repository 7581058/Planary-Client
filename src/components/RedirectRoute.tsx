import { Navigate, useLocation } from 'react-router-dom'

interface RedirectRouteProps {
  path: string
  element: React.ComponentType
}

export const RedirectRoute = ({ path, element: Element }: RedirectRouteProps) => {
  const location = useLocation()
  if (location.pathname === `${path}/`) {
    return <Navigate to={path} replace />
  }
  return <Element />
}
