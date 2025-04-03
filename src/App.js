import React from 'react'
import SideBarComponent from './components/side-bar/SideBarComponent'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './screens/dashboard/Dashboard'
import Registration from './screens/auth/Registration'
import Login from './screens/auth/Login'
import './App.css';
import TopBar from './components/top-bar/TopBar'
import LandingPage from './screens/landing-page/LandingPage'

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

  const topBar = topBarShow.includes(location.pathname);
  const sideBar = sideBarShow.includes(location.pathname);
  return (
    <>
      {topBar && <TopBar />}
      <div className="app">
        {sideBar && <SideBarComponent />}
        <div className="content">
          <Routes>
            <Route path='/'>
              <Route index element={<Dashboard />} />
              <Route path='sign-in' element={<Login />} />
              <Route path='sign-up' element={<Registration />} />
              <Route path='dashboard' element={<LandingPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App