import React from 'react'
import ReactDOM from 'react-dom/client'
import './dark.css'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Users from './users/Users'
import Profile from './profile/Profile'
import Album from './album/Album'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div>

    <HashRouter basename="/">

      {/* Header */}
      <div className='header'>
        <Link to="/">🏠 Home</Link>
      </div>

      {/* Content */}
      <div className='content'>
        <Routes>
          <Route path='/' exact element={<Users />} />
          <Route path='/users' exact element={<Users />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/album/:id' element={<Album />} />
        </Routes>
      </div>
      
    </HashRouter>
  </div>,
)