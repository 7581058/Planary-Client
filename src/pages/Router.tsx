import { RouteObject } from 'react-router-dom'
import Board from './Board'
import BoardEdit from './BoardEdit'
import Calendar from './Calendar'
import Layout from './Layout'
import Login from './Login'
import Note from './Note'
import Planner from './Planner'
import Store from './Store'

export const routues: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: <Board />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/planner',
        element: <Planner />,
      },
      {
        path: '/note',
        element: <Note />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/dashboard/edit',
        element: <BoardEdit />,
      },
    ],
  },
]
