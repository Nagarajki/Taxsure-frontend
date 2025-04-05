import React, { lazy, Suspense } from 'react'
import './App.css';
import SideBarComponent from './components/side-bar/SideBarComponent'
import TopBar from './components/top-bar/TopBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import AutoLogout from './customhooks/AutoLogout'
import AuthGuard from './customhooks/AuthGuard';
const Login = lazy(() => import('./screens/auth/Login'))
const Registration = lazy(() => import('./screens/auth/Registration'))
const LandingPage = lazy(() => import('./screens/landing-page/LandingPage'))
const Dashboard = lazy(() => import('./screens/dashboard/Dashboard'))

const App = () => {
  const location = useLocation();

  const topBarShow = [
    "/",
    "/sign-in",
    "/sign-up"
  ]
  const sideBarShow = [
    "/dashboard"
  ]
  const protectedRoutes = [
    "/dashboard"
  ];

  const topBar = topBarShow.includes(location.pathname);
  const sideBar = sideBarShow.includes(location.pathname);
  const isProtected = protectedRoutes.includes(location.pathname);
  const appContent = (
    <Routes>
      <Route path='/'>
        <Route index element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
        <Route path='sign-in' element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
        <Route path='sign-up' element={<Suspense fallback={<div>Loading...</div>}><Registration /></Suspense>} />
        <Route path='dashboard' element={<Suspense fallback={<div>Loading...</div>}><AuthGuard></AuthGuard><LandingPage /></Suspense>} />
      </Route>
    </Routes>
  )
  return (
    <>
      {topBar && <TopBar />}
      <div className="app">
        {sideBar && <SideBarComponent />}
        <div className="content">
          {isProtected ? (
            <AutoLogout>{appContent}</AutoLogout>
          ) : (
            appContent
          )}
        </div>
      </div>
    </>
  )
}

export default App