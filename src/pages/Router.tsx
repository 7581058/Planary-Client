import { Navigate, RouteObject } from 'react-router-dom'
import Board from './Board'
import BoardEdit from './BoardEdit'
import Calendar from './Calendar'
import Layout from './Layout'
import Login from './Login'
import Note from './Note'
import Planner from './Planner'
import Signup from './Signup'
import Store from './Store'

import {
  CALENDAR_PATH,
  DASHBOARD_EDIT_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
  NOTE_PATH,
  PLANNER_PATH,
  SIGNUP_PATH,
  STORE_PATH,
} from '@/constants/paths'

export const routues: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to={LOGIN_PATH} replace />,
      },
      {
        path: LOGIN_PATH,
        element: <Login />,
      },
      {
        path: DASHBOARD_PATH,
        element: <Board />,
      },
      {
        path: CALENDAR_PATH,
        element: <Calendar />,
      },
      {
        path: PLANNER_PATH,
        element: <Planner />,
      },
      {
        path: NOTE_PATH,
        element: <Note />,
      },
      {
        path: STORE_PATH,
        element: <Store />,
      },
      {
        path: DASHBOARD_EDIT_PATH,
        element: <BoardEdit />,
      },
      {
        path: SIGNUP_PATH,
        element: <Signup />,
      },
    ],
  },
]
