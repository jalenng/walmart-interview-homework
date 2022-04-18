import React from 'react'
import ReactDOM from 'react-dom/client'
import './dark.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Users from './users/Users'
import Profile from './profile/Profile'
import Album from './album/Album'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div>

    {/* Header */}
    <div className='header'>
      <a href="/">🏠 Home</a>
    </div>

    {/* Content */}
    <div className='content'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Users />} />
          <Route path='/users' exact element={<Users />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/album/:id' element={<Album />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>,
)